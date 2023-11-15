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



app.get("/api/keywords", (req,res) => {
	db.getKeywords()
	.then(keywords=>res.status(200).json(keywords))
	.catch((err)=> {console.log(err); res.status(503).json("getKeywords error")})
});


app.get("/api/types", (req,res) => {
	db.getTypes()
	.then(types => res.status(200).json(types))
	.catch((err)=>{console.log(err); res.status(503).json("getTypes error")})
})



app.get("/api/teachers", (req,res)=>{
	db.getTeachers()
	.then(teachers=> res.status(200).json(teachers))
	.catch((err)=>{console.log(err); res.status(503).json("getTeachers error")})
})


app.get("/api/cds", (req,res)=>{
	db.getCdS()
	.then(cds=>res.status(200).json(cds))
	.catch((err)=>{console.log(err); res.status(503).json("getCds error")})
})
//METODI API
//fare metodo gestione autenticazione --> che ritorna ID matricla e chekka auth0



//return all thesis of the department of the student/professor 
app.get('/api/thesis', checkJwt, async (req, res) => {
	try {
		//let user = req.auth.payload.sub;
		//searching for the role of the user authenticated 
		let getRole = await db.getRole(req.auth);
		console.log(getRole)
		if (getRole.role=="teacher"){
			//if it is student we search for the thesis related to his COD_DEGREE
			let thesis = await db.getThesisTeacher(getRole.id)
			
			for (let i=0; i<thesis.length; i++){
				let keywords = await db.getKeywordsbyId(thesis[i].ID)
				thesis[i].keywords = keywords;
			}
			console.log(thesis);
			res.status(200).json(thesis);

			
		}else if (getRole.role == "student"){
			let thesis = await db.getThesisStudent(getRole.id)
			for (let i=0; i<thesis.length; i++){
				let keywords = await db.getKeywordsbyId(thesis[i].ID)
				thesis[i].keywords = keywords;
			}
			console.log(thesis);
			res.status(200).json(thesis);
		}
		//if it is student we search for the thesis related to his COD_DEGREE
		//if it is teacher we get the thesis in which he is supervisor

	} catch (err) {
		res.status(500).end();
	}
});


//gestione degli inserimenti nelle varie tabelle secondarie (keyword etc..) 
//GRUPPI --> aggiungo la tesi ai gruppi di cui fa parte il professore e tutti i co-supervisori che sono professori 
app.get('/api/thesis/:id/groups',async (req, res) => {
	const thesisID = req.params.id;

	if (isNaN(thesisID) || thesisID<=0) {
        return res.status(400).json({ error: 'Invalid thesis ID.' });
    }

	try {
		//i need groups of supervisor and co-supervisor of the thesis
		const groups = await db.getGroupSupervisorAndCoSupervisor(thesisID);
		console.log(groups)
		return res.status(200).json(groups);
	} catch (err) {
		return res.status(503).json({ error: 'Errore nella restituzione dei gruppi' });
	}
});

app.post('/api/insert/thesis',  [
		check('title').isString(),
		check('description').isString(),
		check('required_knowledge').isString(), 
		check('notes').isString(), 
		check('expiration_date').isString(),
		check('level').isString(), 
		check('degree').isString(), 
		check('supervisor').isString(), 
		check('co-supervisors').isArray(), 
		check('keywords').isArray()

  	],async (req, res) => {
	const title = req.body.title;
	const description = req.body.description;
	const req_know = req.body.required_knowledge;
	const notes = req.body.notes;
	const exp_date = req.body.expiration_date;
	const level = req.body.level;
	const degree = req.body.degree;
	const types=req.body.types;
	const supervisor = req.body.supervisor;
	const co_supervisors = req.body.co_supervisors;
	const keywords = req.body.keywords;
	
	try {
		//i need groups of supervisor and co-supervisor of the thesis
		const thesisId = await db.insertThesis(title,description,req_know,notes,exp_date,level,degree,supervisor);
		
		for (let i = 0; i<co_supervisors.length; i++){
			console.log(co_supervisors[i])
			const CoSupID = await db.insertCoSupervisor(thesisId, co_supervisors[i].name,co_supervisors[i].surname,co_supervisors[i].email)
			console.log(CoSupID);
		}

		for (let i = 0; i<keywords.length; i++){
			console.log(keywords[i])
			const keywordID = await db.insertKeyword(thesisId, keywords[i])
			console.log(keywordID);
		}

		for(let i=0;i<types.length;i++){
			const typesId = await db.insertType(thesisId,types[i])
			console.log(typesId);
		}

		const statusId= await db.insertThesisStatus(thesisId);
		console.log(statusId)
		return res.status(200).json(thesisId);
	} catch (err) {
		return res.status(503).json({ error: 'Errore nell inserimento' });
	}
});




//ritorniamo le liste di campi necessari per la visualizzazione intera della thesi 
app.get('/api/thesis/:id', async (req, res) => {
	//fare il check se l'utente può effettivamente vedere la tesi, tramite access token controllo corso di laurea dell'utente se studente
	const thesisID = req.params.id;

	if (isNaN(thesisID) || thesisID<=0) {
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
			supervisor: supervisor,			//arriva come oggetto con name e surname
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
app.post('/api/thesis/:id/proposal', async (req, res) => {
	try {

		//let user = req.auth.payload.sub;
		let thesisId=req.params.id;
		if (isNaN(thesisId) || thesisId<=0) {
			return res.status(400).json({ error: 'Invalid thesis ID.' });
		}
		
		let userRole = await db.getRole(req.auth);
		await db.getThesis(thesisId);
		const state = await db.checkThesisActive(thesisId);

		if(state != "1"){
			return res.status(400).json({ error: 'Thesis not active' });
		}

		if(userRole.role == "student"){
			const propId=await db.insertProposal(userRole.id,thesisId);
		} else{
			return res.status(401).json({ error: 'Unauthorized user' });
		}
		
		return res.status(200).json('Inserimento avvenuto con successo');

	} catch (err) {
		return res.status(503).json({ error: 'Errore nell inserimento della proposta di tesi' });
	}
});


module.exports = { app, port, checkJwt };  
