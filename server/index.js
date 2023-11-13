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
app.post('/api/thesis/groups', async (req, res) => {
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








//ritorniamo le liste di campi necessari per la visualizzazione intera della thesi 
app.get('/api/thesis/:id', async (req, res) => {
	//fare il check se l'utente può effettivamente vedere la tesi, tramite access token controllo corso di laurea dell'utente se studente
	const thesisID = req.params.id;

	try {
		const infoThesis = await db.getThesis(thesisID);
		const titleDegree = await db.getTitleDegree(infoThesis.cds);
		const supervisor = await db.getSupervisor(infoThesis.supervisor);
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
app.post('/api/proposal/insert', async (req, res) => {
	try {
		//const helpDesk = await db.insertHelpDesk(serviceId, counterList);
		return res.status(200).json('Inserimento avvenuto con successo');
	} catch (err) {
		return res.status(503).json({ error: 'Errore nell inserimento' });
	}
});

module.exports = { app, port };
