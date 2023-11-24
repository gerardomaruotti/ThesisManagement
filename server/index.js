'use strict';
const express = require('express');
const cors = require('cors');
const { check, validationResult } = require('express-validator'); // validation middleware
const app = express();
const { auth } = require('express-oauth2-jwt-bearer');
const db = require('./db'); // module for accessing the DB
const port = process.env.PORT || 3001;
app.use(express.json());

const checkJwt = auth({
	audience: 'https://thesismanagement.eu.auth0.com/api/v2/',
	issuerBaseURL: `https://thesismanagement.eu.auth0.com/`,
});

const corsOptions = {
	origin: 'http://localhost:5173',
	credentials: true,
};
app.use(cors(corsOptions));

app.get('/api/keywords',  checkJwt, (req, res) => {
	db.getKeywords()
		.then((keywords) => res.status(200).json(keywords))
		.catch((err) => {
			res.status(503).json('getKeywords error');
		});
});

app.get('/api/user', checkJwt, (req, res) => {
	db.getRole(req.auth)
		.then((userInfo) => res.status(200).json(userInfo))
		.catch((err) => {
			res.status(503).json('error retrieving user info');
		});
});

app.get('/api/types', checkJwt, (req, res) => {
	db.getTypes()
		.then((types) => res.status(200).json(types))
		.catch((err) => {
			res.status(503).json('getTypes error');
		});
});

app.get('/api/teachers', checkJwt, (req, res) => {
	db.getTeachers()
		.then((teachers) => res.status(200).json(teachers))
		.catch((err) => {
			res.status(503).json('getTeachers error');
		});
});

app.get('/api/groups', checkJwt, (req, res) => {
	db.getGroups()
		.then((groups) => res.status(200).json(groups))
		.catch((err) => {
			res.status(503).json('getGroups error');
		});
});

app.get('/api/cds', checkJwt, (req, res) => {
	db.getCdS()
		.then((cds) => res.status(200).json(cds))
		.catch((err) => {
			res.status(503).json('getCds error');
		});
});
//METODI API
//fare metodo gestione autenticazione --> che ritorna ID matricla e chekka auth0



//return all thesis of the department of the student/professor 
app.post('/api/thesis', checkJwt, async (req, res) => {
	try {
		//searching for the role of the user authenticated
		let getRole = await db.getRole(req.auth);
	
		if (getRole.role == 'teacher') {
			//if it is student we search for the thesis related to his COD_DEGREE
			let thesis = await db.getThesisTeacher(getRole.id);
			for (let i = 0; i < thesis.length; i++) {
				let keywords = await db.getKeywordsbyId(thesis[i].ID);
				thesis[i].keywords = keywords;
				let types = await db.getTypesbyId(thesis[i].ID);
				thesis[i].types = types;
			}
			res.status(200).json(thesis);
		} else if (getRole.role == 'student') {
			let thesis = await db.getThesisStudent(getRole.id);
			for (let i = 0; i < thesis.length; i++) {
				let keywords = await db.getKeywordsbyId(thesis[i].ID);
				thesis[i].keywords = keywords;
				let types = await db.getTypesbyId(thesis[i].ID);
				thesis[i].types = types;
			}
			if(req.body.filters == null){
				res.status(200).json(thesis);
			}else{
				let validThesis = [];
				let keyword = req.body.filters.keyword;
				let type = req.body.filters.type;
				let cosupervisor = req.body.filters.cosupervisor;
				let supervisor = req.body.filters.supervisor;
				let groups = req.body.filters.group;
				let exp_date = req.body.filters.exp_date;

				for (let i=0; i<thesis.length; i++){
					let valid = true;
					let totFilters = 0;
					let keywords = await db.getKeywordsbyId(thesis[i].ID)
					let allTypesOfThesis = await db.getTypesbyId(thesis[i].ID);
					let cosupervisors = await db.getCoSupervisorsEmail(thesis[i].ID);
					let sup = await db.getThesisSupervisor(thesis[i].ID);
					let allGroups = await db.getGroup(thesis[i].ID);
					let expirationDate = await db.getThesisExpDate(thesis[i].ID);
					
					if(keyword.length > 0){
						let count=0;
						keyword.forEach(t => {
							if (keywords.includes(t)){
								count++;
							}
						});
						totFilters += count;
						if (count <= 0){
							valid = false;
						}
					}
					if(type.length > 0 && valid){
						let count=0;
						type.forEach(t => {
							if (allTypesOfThesis.includes(t)){
								count++;
							}
						});
						totFilters += count;
							if (count <= 0){
								valid = false;
							}
					}
					if(cosupervisor.length > 0 && valid){
						let count=0;
						cosupervisor.forEach(c => {
							if (cosupervisors.includes(c)){
								count++;
							}
						});
						totFilters += count;
						if (count <= 0){
							valid = false;
						}
					}
					if(groups.length > 0 && valid){
						let count=0;
						groups.forEach(g => {
							if (allGroups.includes(g)){
								count++;
							}
						});
						totFilters += count;
						if (count <= 0){
							valid = false;
						}
					}
									
					if(supervisor.length>0 && valid){
						let count=0;
						if(supervisor.includes(sup)){
							count++;
						}
						totFilters += count;
						if (count <= 0){
							valid = false;
						}
					}
					if(exp_date !== undefined && valid){
						let param = exp_date.split("/");
						let exp_date_tmp = new Date(param[2]+"-"+ param[1] +"-"+param[0]);
						let param2 = expirationDate.split("/");
						let expirationDate_tmp = new Date(param2[2]+"-"+ param2[1] +"-"+param2[0]);
	
						if (exp_date_tmp < expirationDate_tmp){
							valid = false;
						}else{
							totFilters++;
						}
					}
					thesis[i].count = totFilters;
					if (valid){ validThesis.push(thesis[i]);}
				}
				res.status(200).json(validThesis);	
			}
						
		}
	
		//if it is student we search for the thesis related to his COD_DEGREE
		//if it is teacher we get the thesis in which he is supervisor

	} catch (err) {
		res.status(500).end();
	}
});

//gestione degli inserimenti nelle varie tabelle secondarie (keyword etc..)
//GRUPPI --> aggiungo la tesi ai gruppi di cui fa parte il professore e tutti i co-supervisori che sono professori
app.get('/api/thesis/:id/groups', checkJwt, async (req, res) => {
	const thesisID = req.params.id;

	if (isNaN(thesisID) || thesisID <= 0) {
		return res.status(400).json({ error: 'Invalid thesis ID.' });
	}

	try {
		//i need groups of supervisor and co-supervisor of the thesis
		const groups = await db.getGroupSupervisorAndCoSupervisor(thesisID);
		return res.status(200).json(groups);
	} catch (err) {
		return res.status(503).json({ error: 'Errore nella restituzione dei gruppi' });
	}
});

app.post(
	'/api/insert/thesis',
	[
		check('title').isLength({ min: 1 }),
		check('description').isLength({ min: 1 }),
		check('required_knowledge').isLength({ min: 1 }),
		check('notes').isLength({ min: 1 }),
		check('expiration_date').isLength({ min: 1 }),
		check('level').isLength({ min: 1 }),
		check('degree').isLength({ min: 1 }),
		check('co-supervisors').isArray(),
		check('keywords').isArray(),
	],
	checkJwt,
	async (req, res) => {
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
			if (userRole.role == 'teacher') {
				const supervisor = userRole.id;
				const thesisId = await db.insertThesis(title, description, req_know, notes, exp_date, level, degree, supervisor);

				for (let i = 0; i < co_supervisors.length; i++) {
					const CoSupID = await db.insertCoSupervisor(thesisId, co_supervisors[i].name, co_supervisors[i].surname, co_supervisors[i].email);
				}

				for (let i = 0; i < keywords.length; i++) {
					const keywordID = await db.insertKeyword(thesisId, keywords[i]);
				}

				for (let i = 0; i < types.length; i++) {
					const typesId = await db.insertType(thesisId, types[i]);
				}

				const statusId = await db.insertThesisStatus(thesisId);
				return res.status(200).json(thesisId);
			} else {
				return res.status(401).json({ error: 'Unauthorized user' });
			}
		} catch (err) {
			return res.status(503).json({ error: 'Errore nell inserimento' });
		}
	}
);

//ritorniamo le liste di campi necessari per la visualizzazione intera della thesi
app.get('/api/thesis/:id', checkJwt, async (req, res) => {
	//fare il check se l'utente può effettivamente vedere la tesi, tramite access token controllo corso di laurea dell'utente se studente
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
			cds: titleDegree,
			supervisor: supervisor, //arriva come oggetto con name e surname
			keywords: keywords,
			types: types,
			groups: groups,
			coSupervisors: coSupervisors,
		};

		res.status(200).json(thesis);
	} catch (err) {
		res.status(500).json({ error: 'Errore visualizzazione tesi' });
	}
});

////////////////////////////////////////////////////////////////////

//API for the 3rd story --> Apply for proposal
app.post('/api/thesis/:id/apply', checkJwt, async (req, res) => {
	try {
		//let user = req.auth.payload.sub;
		let thesisId = req.params.id;
		if (isNaN(thesisId) || thesisId <= 0) {
			return res.status(400).json({ error: 'Invalid thesis ID.' });
		}

		let userRole = await db.getRole(req.auth);
		await db.getThesis(thesisId);
		const state = await db.checkThesisActive(thesisId);
		let applications=await db.getStudentApplications(userRole.id)

		applications=applications.filter((elem)=> (elem.state == '0' || elem.state == '1'))

		if (state != '1') {
			return res.status(400).json({ error: 'Thesis not active' });
		}

		if(applications.length > 0){
			return res.status(400).json({error : 'Pending or accepted application already exists'})
		}

		if (userRole.role == 'student') {
			const propId = await db.insertApplication(userRole.id, thesisId);
		} else {
			return res.status(401).json({ error: 'Unauthorized user' });
		}

		return res.status(200).json('Inserimento avvenuto con successo');
	} catch (err) {
		return res.status(503).json({ error: 'Errore nell inserimento della proposta di tesi' });
	}
});


app.get('/api/thesis/applications/browse', checkJwt, async(req,res)=> {

	try{
		const userRole=await db.getRole(req.auth);
		if(userRole.role == "teacher"){
			const applications=await db.getTeacherApplications(userRole.id);
			return res.status(200).json(applications);
		} else{
			if(userRole.role == "student"){
				const applications=await db.getStudentApplications(userRole.id);
				for(let i=0;i<applications.length;i++){
					applications[i].keywords=await db.getKeywordsbyId(applications[i].id);
					applications[i].types=await db.getTypesbyId(applications[i].id)
				}
				return res.status(200).json(applications)
			}
		}

		return res.status(401).json({ error: 'Unauthorized user' })
	} catch(err){
		res.status(503).json({error: "GetApplications error"})
	}
})
/*
accettazione application
id stud, id thesi --> input
devo accettare quella dello stud, tutte le altre applicazioni di quella tesi sono messe in canceled 
devo archiviare le tesi 

rifiuto application
id stud, id thesi --> input
metto rejected l'application dello studente che ha richiesto l'application
*/


//API for the 3rd story --> Apply for proposal
app.post('/api/accept/application', [
	check('studentID').isString(),
	check('thesisID').isInt(),
	
], checkJwt, async (req, res) => {
	try {
		//controllo tramite la getRole che il prof possa eseguire l'azione di accettare o rifiutare un application
		let thesis = req.body.thesisID;
		let student = req.body.studentID;

		let getRole=await db.getRole(req.auth);
		if(getRole.role != "teacher"){
			return res.status(401).json({error: "Unauthorized"})
		}
		//check if exist the pair stud - application 
		let getApplication = await db.checkExistenceApplication(thesis, student);
		if (getApplication.available == 1 && getApplication.data.state == 0){
			//The application exists
			let acceptApplication = await db.acceptApplication(thesis, student);

			//now i have to update all the others request for that thesis 
			let cancelApplication = await db.cancelApplications(thesis, student);

			let archived=await db.archiveThesis(thesis);
			return res.status(200).json(acceptApplication);
		}else{
			return res.status(400).json({ error: 'Applicazione inesistente' })
		}

		
	} catch (err) {
		return res.status(503).json({ error: "Errore nell'accettazione di una tesi" });
	}
});

app.post('/api/reject/application', [
	check('studentID').isString(),
	check('thesisID').isInt(),
	
], checkJwt, async (req, res) => {
	try {

	
		//controllo tramite la getRole che il prof possa eseguire l'azione di accettare o rifiutare un application
		let thesis = req.body.thesisID;
		let student = req.body.studentID;

		let getRole=await db.getRole(req.auth);
		if(getRole.role != "teacher"){
			return res.status(401).json({error: "Unauthorized"})
		}
		//check if exist the pair stud - application 
		let getApplication = await db.checkExistenceApplication(thesis, student);
		if (getApplication.available == 1 && getApplication.data.state == 0){
			//The application exists, now i reject it
			let rejectApplication = await db.rejectApplication(thesis, student);
			return res.status(200).json(rejectApplication);
		}else{
			return res.status(400).json({ error: 'Applicazione inesistente' })
		}
		
	} catch (err) {
		return res.status(503).json({ error: "Errore nella reject di una tesi" });
	}
});



module.exports = { app, port, checkJwt };
