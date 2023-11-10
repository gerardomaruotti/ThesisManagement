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




//METODI API
//fare metodo gestione autenticazione --> che ritorna ID matricla e chekka auth0


//return the thesis corresponding to a professor.
app.get('/api/thesis/teacher', async (req, res) => {
	try {
		//const counters = await db.listOfCounter();
		res.status(200).json(/*counters*/);
	} catch (err) {
		res.status(500).end();
	}
});

//return all thesis of the department of the student
app.get('/api/thesis/student', async (req, res) => {
	try {
		//const counters = await db.listOfCounter();

    //gestione dei filtri interna 
    //separare i casi con filtro e senza filtro 
		res.status(200).json(/*counters*/);
	} catch (err) {
		res.status(500).end();
	}
});

//servizio per inserimento --> lista teacher (id, group)
//servizio per inserimento --> lista groups (id, group)
app.get('/api/thesis/inert/info', async (req, res) => {
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
app.post('/api/thesis/insert', async (req, res) => {
	try {
		//const helpDesk = await db.insertHelpDesk(serviceId, counterList);
		return res.status(200).json('Inserimento avvenuto con successo');
	} catch (err) {
		return res.status(503).json({ error: 'Errore nell inserimento' });
	}
});

//ritorniamo le liste di campi necessari per la visualizzazione intera della thesi 
app.get('/api/thesis/details', async (req, res) => {
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
