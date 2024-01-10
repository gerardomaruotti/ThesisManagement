'use strict';
const express = require('express');
const cors = require('cors');
const { check, validationResult } = require('express-validator'); // validation middleware
const app = express();
const { auth } = require('express-oauth2-jwt-bearer');
const db = require('./db'); // module for accessing the DB
const port = process.env.PORT || 3001;
const dayjs = require('dayjs');
const currentDate = dayjs();
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');
require('dotenv').config();

app.use(express.json());

 (async() => {
	await db.updateThesisStatus(currentDate.format("YYYY-MM-DD"))
	await db.cancelPendingApplicationsExpiredThesis(currentDate.format("YYYY-MM-DD"))
 })();



cron.schedule('0 0 * * *', () => {
	(async() => {
		await db.updateThesisStatus(currentDate.format("YYYY-MM-DD"))
		await db.cancelPendingApplicationsExpiredThesis(currentDate.format("YYYY-MM-DD"))
	 })();
});

const checkJwt = auth({
	audience: 'https://thesismanagement.eu.auth0.com/api/v2/',
	issuerBaseURL: `https://thesismanagement.eu.auth0.com/`,
});

const corsOptions = {
	origin: 'http://localhost:5173',
	credentials: true,
};
app.use(cors(corsOptions));

const transporter = nodemailer.createTransport(
	sgTransport({
		auth: {
			api_key: process.env.API_KEY,
		},
	})
);
const dir = './files';

if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, dir)
	},
	filename: function (req, file, cb) {
		cb(null, `${Date.now()}_${file.originalname}`)
	}
});

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 8000000
	}
});

app.use('/files', express.static(path.join(__dirname, 'files')));

app.get('/api/keywords', checkJwt, (req, res) => {
	db.getKeywords()
		.then((keywords) => res.status(200).json(keywords))
		.catch((err) => {
			res.status(503).json({ error: 'getKeywords error' });
		});
});

app.get('/api/user', checkJwt, (req, res) => {
	db.getRole(req.auth)
		.then((userInfo) => res.status(200).json(userInfo))
		.catch((err) => {
			res.status(503).json({ error: 'error retrieving user info' });
		});
});

app.get('/api/types', checkJwt, (req, res) => {
	db.getTypes()
		.then((types) => res.status(200).json(types))
		.catch((err) => {
			res.status(503).json({ error: 'getTypes error' });
		});
});

app.get('/api/teachers', checkJwt, (req, res) => {
	db.getTeachers()
		.then((teachers) => res.status(200).json(teachers))
		.catch((err) => {
			res.status(503).json({ error: 'getTeachers error' });
		});
});

app.get('/api/groups', checkJwt, (req, res) => {
	db.getGroups()
		.then((groups) => res.status(200).json(groups))
		.catch((err) => {
			res.status(503).json({ error: 'getGroups error' });
		});
});

app.get('/api/cds', checkJwt, (req, res) => {
	db.getCdS()
		.then((cds) => res.status(200).json(cds))
		.catch((err) => {
			res.status(503).json({ error: 'getCds error' });
		});
});


//METODI API
//fare metodo gestione autenticazione --> che ritorna ID matricla e chekka auth0



//return all thesis of the department of the student/professor 
app.post('/api/thesis', checkJwt,(req, res) => {
	(async () => {
		try {
			const getRole = await db.getRole(req.auth);
			const date = await db.getVirtualDate();
			if (getRole.role == 'teacher') {
				const thesis = await processTeacherThesis(getRole.id, date, req.body.filters, getRole);
				res.status(200).json(thesis);
			} else if (getRole.role == 'student') {
				const thesis = await processStudentThesis(getRole.id, (date == 0) ? currentDate.format('YYYY-MM-DD') : date, req.body.filters, getRole);
				res.status(200).json(thesis);
			}
			res.status(401).json({ error: 'Unauthorized user' })

		} catch (err) {
			return res.status(500).end();
		}
	})();
});


async function processTeacherThesis(teacherId, date, filters, getRole) {
	let thesis = await db.getThesisTeacher(teacherId, date);
	thesis = await processThesisDetails(thesis, getRole);
	if (!filters) {
		return thesis;
	}

	return await filterThesis(thesis, filters);
}

async function processStudentThesis(studentId, date, filters, getRole) {
	let thesis = await db.getThesisStudent(studentId, date);
	thesis = await processThesisDetails(thesis, getRole);
	if (!filters) {
		return thesis;
	}

	return await filterThesis(thesis, filters);
}

async function processThesisDetails(thesis, getRole) {
	for (let i = 0; i < thesis.length; i++) {
		thesis[i].keywords = await db.getKeywordsbyId(thesis[i].ID);
		thesis[i].types = await db.getTypesbyId(thesis[i].ID);
		if (getRole.role == 'teacher') thesis[i].applications = await db.checkExistenceApplicationForThesis(thesis[i].ID);
	}
	return thesis;
}

async function filterThesis(thesis, filters) {
	const validThesis = [];
	for (let i = 0; i < thesis.length; i++) {
		const isValid = await validateThesis(thesis[i], filters);
		if (isValid) {
			validThesis.push(thesis[i]);
		}
	}
	return validThesis;
}

async function validateThesis(thesis, filters) {
	let totFilters = { value: 0 };
	let cosupervisors = await db.getCoSupervisorsEmail(thesis.ID);
	let sup = await db.getThesisSupervisor(thesis.ID);
	let allGroups = await db.getGroup(thesis.ID);
	let expirationDate = await db.getThesisExpDate(thesis.ID);

	const keywordValid = validateFilter('keyword', filters.keyword, thesis.keywords, totFilters);
	const typeValid = validateFilter('type', filters.type, thesis.types, totFilters);
	const cosupervisorValid = validateFilter('cosupervisor', filters.cosupervisor, cosupervisors, totFilters);
	const groupValid = validateFilter('group', filters.group, allGroups, totFilters);
	const supervisorValid = validateFilter('supervisor', filters.supervisor, new Array(sup), totFilters);
	const expDateValid = validateExpDate(filters.exp_date, expirationDate, totFilters);
	thesis.count = totFilters.value;
	// Example: Require at least one valid filter
	return keywordValid && typeValid && cosupervisorValid && groupValid && supervisorValid && expDateValid;
}

function validateFilter(filterName, filterValues, thesisValues, totFilters) {
	if (filterValues && filterValues.length > 0) {
		let count = 0;
		filterValues.forEach(value => {
			if (thesisValues.includes(value)) {
				count++;
			}
		});
		totFilters.value += count;
		return count > 0;
	}
	return true; // No filter, consider it valid
}

function validateExpDate(filterExpDate, thesisExpDate, totFilters) {
	if (filterExpDate !== undefined) {
		const filterExpDateTmp = new Date(filterExpDate);
		const thesisExpDateTmp = new Date(thesisExpDate);

		if (thesisExpDateTmp <= filterExpDateTmp) totFilters.value++;

		return thesisExpDateTmp <= filterExpDateTmp
	}
	return true; // No filter, consider it valid
}


//gestione degli inserimenti nelle varie tabelle secondarie (keyword etc..)
//GRUPPI --> aggiungo la tesi ai gruppi di cui fa parte il professore e tutti i co-supervisori che sono professori
app.get('/api/thesis/:id/groups', checkJwt,(req, res) => {
	(async () => {
		const thesisID = req.params.id;

		if (isNaN(thesisID) || thesisID <= 0) {
			return res.status(400).json({ error: 'Invalid thesis ID.' });
		}

		try {
			// I need groups of supervisor and co-supervisor of the thesis
			const groups = await db.getGroupSupervisorAndCoSupervisor(thesisID);
			return res.status(200).json(groups);
		} catch (err) {
			return res.status(503).json({ error: 'Errore nella restituzione dei gruppi' });
		}
	})();
});

app.post(
	'/api/insert/thesis',
	[
		check('title').isString().trim().isLength({ min: 1 }),
		check('description').isString().trim().isLength({ min: 1 }),
		check('required_knowledge').isString(),
		check('notes').isString(),
		check('expiration_date').isString().trim().isLength({ min: 10, max: 10 }),
		check('level').isString().trim().isLength({ min: 1 }),
		check('degree').isString().trim().isLength({ min: 1 }),
		check('co_supervisors').isArray(),
		check('keywords').isArray(),
		check('types').isArray(),
	],
	checkJwt,
	(req, res) => {
		(async () => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() });
			}

			const title = req.body.title;
			const description = req.body.description;
			const req_know = req.body.required_knowledge;
			const notes = req.body.notes;
			const exp_date = req.body.expiration_date;
			const level = req.body.level;
			const degree = req.body.degree;
			const types = req.body.types;
			const co_supervisors = req.body.co_supervisors;
			const keywords = req.body.keywords;

			try {
				//i need groups of supervisor and co-supervisor of the thesis
				const userRole = await db.getRole(req.auth);
				const date = await db.getVirtualDate();
				if (userRole.role == 'teacher') {
					const supervisor = userRole.id;
					if (dayjs(exp_date).isBefore((date == 0) ? currentDate.format("YYYY-MM-DD") : date)) return res.status(400).json({ error: 'The expiration date is not valid, change the expiration date' });
					const thesisId = await db.insertThesis(title, description, req_know, notes, exp_date, level, degree, supervisor);
					for (let i = 0; i < co_supervisors.length; i++) {
						await db.insertCoSupervisor(thesisId, co_supervisors[i].name, co_supervisors[i].surname, co_supervisors[i].email);
					}

					for (let i = 0; i < keywords.length; i++) {
						await db.insertKeyword(thesisId, keywords[i]);
					}

					for (let i = 0; i < types.length; i++) {
						await db.insertType(thesisId, types[i]);
					}

					await db.insertThesisStatus(thesisId);
					return res.status(200).json(thesisId);
				} else {
					return res.status(401).json({ error: 'Unauthorized user' });
				}
			} catch (err) {
				return res.status(503).json({ error: 'Error in the insertion' });
			}
		})();
});

//ritorniamo le liste di campi necessari per la visualizzazione intera della thesi
app.get('/api/thesis/:id', checkJwt,(req, res) => {
	//fare il check se l'utente può effettivamente vedere la tesi, tramite access token controllo corso di laurea dell'utente se studente
	(async () => {
		const thesisID = req.params.id;

		if (isNaN(thesisID) || thesisID <= 0) {
			return res.status(400).json({ error: 'Invalid thesis ID.' });
		}

		try {
			const infoThesis = await db.getThesis(thesisID);
			const titleDegree = await db.getTitleDegree(infoThesis.cds);
			const supervisor = await db.getTeacher(infoThesis.supervisor);
			const keywords = await db.getKeywordsbyId(thesisID);
			const types = await db.getTypesbyId(thesisID);
			const groups = await db.getGroupSupervisorAndCoSupervisor(thesisID);
			const coSupervisors = await db.getCoSupervisors(thesisID);

			let thesis = {
				title: infoThesis.title,
				description: infoThesis.description,
				requiredKnowledge: infoThesis.requiredKnowledge,
				notes: infoThesis.notes,
				expirationDate: infoThesis.expirationDate,
				level: infoThesis.level,
				codeDegree: infoThesis.cds,
				cds: titleDegree,
				supervisor: supervisor, //arriva come oggetto con name e surname
				keywords: keywords,
				types: types,
				groups: groups,
				coSupervisors: coSupervisors,
			};
			res.status(200).json(thesis);
		} catch (err) {
			res.status(500).json({ error: 'Error the view of the thesis' });
		}
	})();
});

app.post('/api/thesis/:id/apply', upload.single('file'), checkJwt,(req, res) => {
	(async () => {
		try {
			let thesisId = req.params.id;
			if (isNaN(thesisId) || thesisId <= 0) {
				return res.status(400).json({ error: 'Invalid thesis ID.' });
			}
			const date = await db.getVirtualDate();
			let userRole = await db.getRole(req.auth);
			const thesis_info = await db.getThesis(thesisId);
			const state = await db.checkThesisActive(thesisId, date);
			let applications = await db.getStudentApplications(userRole.id, date)

			applications = applications.filter((elem) => (elem.state == '0' || elem.state == '1'))

			if (state != '1') {
				return res.status(400).json({ error: 'Thesis not active' });
			}

			if (applications.length > 0) {
				return res.status(400).json({ error: 'Pending or accepted application already exists' })
			}

			if (userRole.role != 'student') return res.status(401).json({ error: 'Unauthorized user' });

			let applId = await db.insertApplication(userRole.id, thesisId, (date == 0) ? currentDate.format('YYYY-MM-DD') : date);

			if (req.file) {
				await db.insertCv(applId, req.file.filename, req.file.path);
			}

			let getMailTeacher = await db.getMailTeacher(thesis_info.supervisor);

			const mailOptions = {
				from: 's313373@studenti.polito.it',
				to: `${getMailTeacher}`,  //da sostituire, la mai 317977 è per test
				text: `You received a Thesis Application for ${thesis_info.title} from student ${userRole.id}`,
				subject: 'Thesis Application',
			};

			// Send the email using Nodemailer
			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					return console.error(error);
				}
				console.log('Message sent: %s', info.message);
			});
			return res.status(200).json('Insertion Succesful');
		} catch (err) {
			return res.status(503).json({ error: 'Error in the insertion of an application' });
		}
	})();
});


app.get('/api/thesis/applications/browse', checkJwt,(req, res) => {
	(async () => {
		try {
			const userRole = await db.getRole(req.auth);
			const date = await db.getVirtualDate();
			if (userRole.role == "teacher") {
				const applications = await db.getTeacherApplications(userRole.id, date);
				return res.status(200).json(applications);
			} else {
				if (userRole.role == "student") {
					const applications = await db.getStudentApplications(userRole.id, date);
					for (let i = 0; i < applications.length; i++) {
						applications[i].keywords = await db.getKeywordsbyId(applications[i].id);
						applications[i].types = await db.getTypesbyId(applications[i].id)
					}
					return res.status(200).json(applications)
				}
			}

			return res.status(401).json({ error: 'Unauthorized user' })
		} catch (err) {
			res.status(503).json({ error: "GetApplications error" })
		}
	})();
});

app.post('/api/accept/application', [
	check('studentID').isString().trim().notEmpty(),
	check('thesisID').isInt().custom(value => value > 0),

], checkJwt,(req, res) => {
	(async () => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() });
			}

			let thesis = req.body.thesisID;
			let student = req.body.studentID;

			let getMailStudent = await db.getMailStudent(student);

			let thesis_info = await db.getThesis(thesis);
			let getRole = await db.getRole(req.auth);
			if (getRole.role != "teacher") {
				return res.status(401).json({ error: "Unauthorized" })
			}
			let getApplication = await db.checkExistenceApplication(thesis, student);
			if (getApplication.available == 1 && getApplication.data.state == 0) {
				let acceptApplication = await db.acceptApplication(thesis, student);
				await db.cancelApplications(thesis, student);
				await db.archiveThesis(thesis);
				const mailOptions = {
					from: 's313373@studenti.polito.it',
					to: `${getMailStudent}`,
					text: `Your thesis application for ${thesis_info.title} has been accepted`,
					subject: 'Thesis Accepted',
				};

				transporter.sendMail(mailOptions, (error, info) => {
					if (error) {
						return console.error(error);
					}
					console.log('Message sent: %s', info.message);
				});
				return res.status(200).json(acceptApplication);
			} else {
				return res.status(400).json({ error: 'Application does not exist' })
			}


		} catch (err) {
			return res.status(503).json({ error: "Error while awhile accepting the application" });
		}
	})();
});

app.post('/api/reject/application', [
	check('studentID').isString().trim().notEmpty(),
	check('thesisID').isInt().custom(value => value > 0),

], checkJwt, (req, res) => {
	(async () => {
		try {

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() });
			}
			let thesis = req.body.thesisID;
			let student = req.body.studentID;
			let getMailStudent = await db.getMailStudent(student);
			let getRole = await db.getRole(req.auth);
			let thesis_info = await db.getThesis(thesis);
			if (getRole.role != "teacher") {
				return res.status(401).json({ error: "Unauthorized" })
			}
			let getApplication = await db.checkExistenceApplication(thesis, student);
			if (getApplication.available == 1 && getApplication.data.state == 0) {
				let rejectApplication = await db.rejectApplication(thesis, student);

				const mailOptions = {
					from: 's313373@studenti.polito.it',
					to: `${getMailStudent}`,
					text: `Your thesis application for ${thesis_info.title} has been rejected`,
					subject: 'Thesis Rejected',
				};

				transporter.sendMail(mailOptions, (error, info) => {
					if (error) {
						return console.error(error);
					}
					console.log('Message sent: %s', info.message);
				});
				return res.status(200).json(rejectApplication);
			} else {
				return res.status(400).json({ error: 'Application does not exist' })
			}

		} catch (err) {
			return res.status(503).json({ error: "Error in the reject of an application" });
		}
	})();
});

app.put('/api/edit/thesis/:id',
	[
		check('title').isString().trim().isLength({ min: 1 }),
		check('description').isString().trim().isLength({ min: 1 }),
		check('required_knowledge').isString(),
		check('notes').isString(),
		check('expiration_date').isString().trim().isLength({ min: 10, max: 10 }),
		check('level').isString().trim().isLength({ min: 1 }),
		check('degree').isString().trim().isLength({ min: 1 }),
		check('co_supervisors').isArray(),
		check('keywords').isArray(),
		check('types').isArray(),
	],
	checkJwt,
	(req, res) => {
		(async () => {
			const thesisId = req.params.id;
			if (isNaN(thesisId) || thesisId <= 0) {
				return res.status(400).json({ error: 'Invalid thesis Id.' });
			}

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() });
			}

			try {
				const userRole = await db.getRole(req.auth);

				if (userRole.role != 'teacher') {
					return res.status(401).json({ error: 'Unauthorized user' });
				}

				const supervisor = await db.getThesisSupervisor(thesisId);
				if (userRole.id != supervisor) {
					return res.status(400).json({ error: 'The teacher does not have the permission to modify the thesis' });
				}

				const date = await db.getVirtualDate();
				const checkApplications = await db.checkExistenceAcceptedApplicationForThesis(thesisId);
				if (checkApplications == 1) {
					return res.status(400).json({ error: 'The thesis has accepted applications and cannot be modified' });
				}

				const expirationDate = req.body.expiration_date;
				if (dayjs(expirationDate).isBefore((date == 0) ? currentDate.format("YYYY-MM-DD") : date)) {
					return res.status(400).json({ error: 'The expiration date is not valid, change the expiration date' });
				}

				const checkStatus = await db.checkThesisActive(thesisId, date);

				await processCoSupervisors(thesisId, req.body.co_supervisors);
				await processKeywords(thesisId, req.body.keywords);
				await processTypes(thesisId, req.body.types);

				if (checkStatus == '0') {
					await db.activateThesis(thesisId);
				}

				await db.editThesis(thesisId, req.body.title, req.body.description, req.body.required_knowledge, req.body.notes, expirationDate, req.body.level, req.body.degree);

				return res.status(200).json(thesisId);
			} catch (err) {
				return res.status(503).json({ error: 'Error in the update of the thesis' });
			}
		})();
});

async function processCoSupervisors(thesisId, coSupervisors) {
	await db.deleteCoSupervisor(thesisId);
	for (let i = 0; i < coSupervisors.length; i++) {
		await db.insertCoSupervisor(thesisId, coSupervisors[i].name, coSupervisors[i].surname, coSupervisors[i].email);
	}
}

async function processKeywords(thesisId, keywords) {
	await db.deleteKeyword(thesisId);
	for (let i = 0; i < keywords.length; i++) {
		await db.insertKeyword(thesisId, keywords[i]);
	}
}

async function processTypes(thesisId, types) {
	await db.deleteType(thesisId);
	for (let i = 0; i < types.length; i++) {
		await db.insertType(thesisId, types[i]);
	}
}


app.get('/api/virtualClockStatus', checkJwt, (req, res) => {
	(async () => {
	try {
		const date = await db.getVirtualDate();
		return res.status(200).json(date)

	} catch (err) {
		return res.status(503).json({ error: "Get Virtual Clock status error" })
	}
})();
});


app.put('/api/virtualClockOn', [
	check('date').isString().trim().isLength({ min: 10, max: 10 })
],
	checkJwt,
	(req, res) => {
		(async () => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() });
			}

			try {
				await db.setVirtualDate(req.body.date);
				return res.status(200).json("Updated")
			}
			catch (err) {
				return res.status(503).json({ error: "Update error" })
			}


		})();
});


app.put('/api/virtualClockOff', checkJwt,(req, res) => {
	(async () => {
		try {
			await db.setVirtualDate(null);
			await db.resetStatusPastApplications(currentDate.format("YYYY-MM-DD"))
			await db.deleteFutureApplications(currentDate.format("YYYY-MM-DD"));
			return res.status(200).json("Updated")
		}
		catch (err) {
			return res.status(503).json({ error: "Update error" })
		}

	})();
});


//DELETE THESIS 
app.post('/api/delete/thesis', [
	check('thesisID').isInt().custom(value => value > 0),

], checkJwt, (req, res) => {
	(async () => {
		try {

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() });
			}
			let thesis = req.body.thesisID;
			let getRole = await db.getRole(req.auth);
			if (getRole.role != "teacher") {
				return res.status(401).json({ error: "Unauthorized" })
			}

			let getThesisExistance = await db.checkExistenceThesis(thesis);
			if (getThesisExistance.available == 1 && getThesisExistance.data.state == 1) {
				await db.setStatusDeleted(thesis)
				await db.cancelApplicationsByThesis(thesis)
				return res.status(200).json("Thesis deleted successfully");
			} else {
				return res.status(400).json({ error: 'Thesis proposal does not exist' })
			}
		} catch (err) {
			return res.status(503).json({ error: "Error in the deletion of the thesis" });
		}
	})();
});

//Archive thesis proposal
app.post('/api/archive/thesis', [
	check('thesisID').isInt().custom(value => value > 0),

], checkJwt, (req, res) => {
	(async () => {
		try {

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() });
			}
			let thesis = req.body.thesisID;
			let getRole = await db.getRole(req.auth);
			if (getRole.role != "teacher") {
				return res.status(401).json({ error: "Unauthorized" })
			}

			const supervisor = await db.getThesisSupervisor(thesis);
			if (getRole.id != supervisor) {
				return res.status(400).json({ error: 'The teacher does not have the permission to archive the thesis' });
			}

			let getThesisExistance = await db.checkExistenceThesis(thesis);
			if (getThesisExistance.available == 1 && getThesisExistance.data.state == 1) {
				await db.archiveThesis(thesis)
				await db.cancelPendingApplications(thesis)

				return res.status(200).json("Thesis archived successfully");
			} else {
				return res.status(400).json({ error: 'The thesis is already archived or deleted' })
			}
		} catch (err) {
			return res.status(503).json({ error: "Error in archiving the thesis" });
		}
	})();
});

app.post('/api/applications/details', checkJwt, [
	check('idApplication').isInt().custom(value => value > 0)
],
	(req, res) => {
		(async () => {
			try {
				const errors = validationResult(req);
				if (!errors.isEmpty()) {
					return res.status(422).json({ errors: errors.array() });
				}
				const date = await db.getVirtualDate();
				let applId = req.body.idApplication;

				let getRole = await db.getRole(req.auth);
				if (getRole.role != "teacher") {
					return res.status(401).json({ error: "Unauthorized" })
				}

				let getApplication = await db.checkExistenceApplicationById(applId,date);
				if (getApplication == 0) return res.status(400).json({ error: "Application does not exists" })
				let studentInfo = await db.getStudentInfo(getApplication.student);
				studentInfo.exams = await db.getStudentExams(getApplication.student);
				studentInfo.state = getApplication.state;
				let studentCv = await db.getCv(applId);
				if (studentCv.filename != null) {
					studentInfo.cv = studentCv.path;
				}

				return res.status(200).json(studentInfo)


			} catch (err) {

				res.status(503).json({ error: "GetStudentInfo error" })

			}

		})();
});

app.get('/api/requests', checkJwt, (req,res) => {

(async() =>{
	try{
		const userRole = await db.getRole(req.auth);
		if (userRole.role == "teacher") {
			let teacherRequests = await db.getTeacherRequests(userRole.id);
			teacherRequests = await processIDS(teacherRequests);
			return res.status(200).json(teacherRequests);
		} else {
			if (userRole.role == "secretary") {
				let secretaryRequests = await db.getSecretaryRequests();
				secretaryRequests = await processIDS(secretaryRequests);
				return res.status(200).json(secretaryRequests);
			} else {
				if (userRole.role == "student") {
					let studentRequests = await db.getStudentRequests(userRole.id);
					studentRequests = await processIDS(studentRequests);
					return res.status(200).json(studentRequests);
				} else {
					return res.status(401).json({error: "Unauthorized user"})
				}
			}
		}

	} catch(err){
		return res.status(503).json({error: "Error get Requests"})
	}
	
})();



})


async function processIDS(requests){
	for(let i=0;i<requests.length;i++){
		let cosup = await db.getRequestCoSup(requests[i].id)
		let infoS = await db.getStudentInfo(requests[i].student);
		let infoT = await db.getTeacher(requests[i].supervisor);
		requests[i].co_supervisors = [...cosup];
		requests[i].nameS=infoS.name;
		requests[i].surnameS=infoS.surname;
		requests[i].nameT=infoT.name;
		requests[i].surnameT=infoT.surname;
	}

	return requests;
}

app.post(
	'/api/insert/request',
	[
		check('supervisor').isString().trim().isLength({ min: 1 }),
		check('title').isString().trim().isLength({ min: 1 }),
		check('description').isString(),
		check('co_supervisors').isArray(),

	], 
	checkJwt,
	(req, res) => {
		(async () => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() });
			}

			const supervisor = req.body.supervisor;
			const title = req.body.title;
			const description = req.body.description;
			const co_supervisors = req.body.co_supervisors;
	
			try {
				const userRole = await db.getRole(req.auth);
				if (userRole.role != 'student') return res.status(401).json({ error: 'Unauthorized user' });
				
				const student = userRole.id;
				const request_date = currentDate.format("YYYY-MM-DD");
				let approval_date = "";
				let status = 0;
				const pendingRequests = await db.checkPendingStudentRequests(student);
				if(pendingRequests) return res.status(400).json({ error: 'Student has already pending requests' })
				const requestId = await db.insertRequest(supervisor, title, description, student, request_date, approval_date, status);
				for (let i = 0; i < co_supervisors.length; i++) {	
					await db.insertCoSupervisorRequest(requestId, co_supervisors[i].name, co_supervisors[i].surname, co_supervisors[i].email);
				}
				
				return res.status(200).json("Insert request successful"); 
			} catch (err) {
				return res.status(503).json({ error: 'Error in the insertion of the request' });
			}
		})();
});



app.post(
	'/api/approve/request/secretary',
	[
		check('requestID').isInt()
	], checkJwt,
	(req, res) => {
		(async () => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() });
			}
			const reqID =  req.body.requestID;

			try {
				const userRole = await db.getRole(req.auth);
				const requestExists = await db.checkRequestExistance(reqID);

				if (!requestExists) return res.status(500).json({ error: 'Request does not exists' });

				if (userRole.role != "secretary") return res.status(401).json({ error: 'Unauthorized user' });
					//approve the request, modify the state from 0 to 1
				await db.approveRequestSecretary(reqID);

				let teacher = await db.getRequestTeacher(reqID);
				let student = await db.getRequestStudent(reqID);
				let mailTeacher = await db.getMailTeacher(teacher);

				const mailOptions = {
					from: `${userRole.email}`,
					to: `${mailTeacher}`,  
					text: `You received a Thesis Request from student ${student}`,
					subject: 'Thesis Request',
				};

				// Send the email using Nodemailer
				transporter.sendMail(mailOptions, (error, info) => {
					if (error) {
						return console.error(error);
					}
					console.log('Message sent: %s', info.message);
				});
				
				return res.status(200).json("Request approved by secretary");

			} catch (err) {
				return res.status(503).json({ error: 'Error in the process to approve request by secretary' });
			}
		})();
});


app.post( //i am supposed to be a secretary 
	'/api/reject/request/secretary',
	[
		check('requestID').isInt()
	], checkJwt,
	(req, res) => {
		(async () => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() });
			}
			const reqID =  req.body.requestID;

			try {
				const userRole = await db.getRole(req.auth);
				const requestExists = await db.checkRequestExistance(reqID);

				if (!requestExists) return res.status(500).json({ error: 'Request does not exists' });
				if (userRole.role != "secretary") return res.status(401).json({ error: 'Unauthorized user' });
					//approve the request, modify the state from 0 to 2
					await db.rejectRequestSecretary(reqID);
					return res.status(200).json("Request rejected by secretary");
			} catch (err) {
				return res.status(503).json({ error: 'Error in the process to reject request by secretary' });
			}
		})();
});



app.post( 
	'/api/approve/request/professor',
	[
		check('requestID').isInt()
	], checkJwt,
	(req, res) => {
		(async () => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() });
			}
			const reqID =  req.body.requestID;

			try {
				const userRole = await db.getRole(req.auth);
				const requestExists = await db.checkRequestExistance(reqID);

				if (!requestExists) return res.status(500).json({ error: 'Request does not exists' });
				if (userRole.role != "teacher") return res.status(401).json({ error: 'Unauthorized user' });
					//approve the request, modify the state from 1 to 3
				let approval_date=currentDate.format("YYYY-MM-DD");
				await db.approveRequestTeacher(reqID,approval_date);
				return res.status(200).json("Request accepted by professor");
			} catch (err) {
				return res.status(503).json({ error: 'Error in the process to approve request by professor' });
			}
		})();
});



app.post( 
	'/api/reject/request/professor',
	[
		check('requestID').isInt()
	], checkJwt,
	(req, res) => {
		(async () => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() });
			}
			const reqID =  req.body.requestID;

			try {
				const userRole = await db.getRole(req.auth);
				const requestExists = await db.checkRequestExistance(reqID);

				if (!requestExists) return res.status(500).json({ error: 'Request does not exists' });
				if (userRole.role != "teacher") return res.status(401).json({ error: 'Unauthorized user' });
				//approve the request, modify the state from 1 to 4
				await db.rejectRequestTeacher(reqID);
				return res.status(200).json("Request rejected by professor");
			} catch (err) {
				return res.status(503).json({ error: 'Error in the process to reject request by professor' });
			}
		})();
});

app.post( 
	'/api/change/request/professor',
	[
		check('requestID').isInt(),
		check('notes').isString()
	], checkJwt,
	(req, res) => {
		(async () => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() });
			}
			const reqID =  req.body.requestID;
			const notes = req.body.notes;
			try {
				const userRole = await db.getRole(req.auth);
				const requestExists = await db.checkRequestExistance(reqID);

				if (!requestExists) return res.status(500).json({ error: 'Request does not exists' });
				if (userRole.role != "teacher") return res.status(401).json({ error: 'Unauthorized user' });
				await db.changeRequestTeacher(reqID, notes);
				return res.status(200).json("Request change completed by professor");
			} catch (err) {
				return res.status(503).json({ error: 'Error in the process to request change by professor' });
			}
		})();
});

async function processRequestSupervisor (requestID, co_supervisors){

	await db.deleteRequestCoSupervisor(requestID);
	for(let i=0;i<co_supervisors.length;i++){
		await db.insertCoSupervisorRequest(reqID,co_supervisors[i].name,co_supervisors[i].surname,co_supervisors[i].email)
	}

}


module.exports = { app, port, transporter };



