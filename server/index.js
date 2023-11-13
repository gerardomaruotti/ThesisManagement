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
  audience: 'https://dev-1v67v8wnwnvivonl.us.auth0.com/api/v2/',
  issuerBaseURL: `https://dev-1v67v8wnwnvivonl.us.auth0.com/`,
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
app.get('/api/thesis', async (req, res) => {
	//usare req.params == null per verificare se ci sono i filtri 
	try {
		//const counters = await db.listOfCounter();

    //gestione dei filtri interna 
    //separare i casi con filtro e senza filtro 
		res.status(200).json(/*counters*/);
	} catch (err) {
		res.status(500).end();
	}
});


//gestione degli inserimenti nelle varie tabelle secondarie (keyword etc..) 
//GRUPPI --> aggiungo la tesi ai gruppi di cui fa parte il professore e tutti i co-supervisori che sono professori 
app.post('/api/thesis/groups',  [
	check('ID').isInt(), //INT check
  ],async (req, res) => {
	const thesisID = req.body.ID;
	try {
		//i need groups of supervisor and co-supervisor of the thesis
		const groups = await db.getGroupSupervisorAndCoSupervisor(thesisID);
		console.log(groups)
		return res.status(200).json(groups);
	} catch (err) {
		return res.status(503).json({ error: 'Errore nell inserimento' });
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
			const CoSupID = await db.insertKeyword(thesisId, keywords[i])
			console.log(CoSupID);
		}

		return res.status(200).json();
	} catch (err) {
		return res.status(503).json({ error: 'Errore nell inserimento' });
	}
});














//ritorniamo le liste di campi necessari per la visualizzazione intera della thesi 
app.get('/api/thesis/details', async (req, res) => {
	//prendere nel param l'id della thesis 
	try {
		//const counters = await db.listOfCounter();

    //gestione dei filtri interna 
    //separare i casi con filtro e senza filtro 
		res.status(200).json(/*counters*/);
	} catch (err) {
		res.status(500).end();
	}
});

////////////////////////////////////////////////////////////////////

//API for the 3rd story --> Apply for proposal 
app.post('/api/proposal/insert', async (req, res) => {
	try {
		//const helpDesk = await db.insertHelpDesk(serviceId, counterList);
		return res.status(200).json('Inserimento avvenuto con successo');
	} catch (err) {
		return res.status(503).json({ error: 'Errore nell inserimento' });
	}
});

module.exports = { app, port };
