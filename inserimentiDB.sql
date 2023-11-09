BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS "DEGREE" (
  	"COD_DEGREE" VARCHAR(25),
	  "TITLE_DEGREE"	VARCHAR(100),
	  PRIMARY KEY("COD_DEGREE")
);


CREATE TABLE IF NOT EXISTS "GROUP"(
  "COD_GROUP" VARCHAR(25),
  "NAME" VARCHAR(25),
    PRIMARY KEY("COD_GROUP")
);

CREATE TABLE IF NOT EXISTS "DEPARTMENT"(
  "COD_DEPARTMENT" VARCHAR(25),
  "NAME" VARCHAR(25),
   PRIMARY KEY("COD_DEPARTMENT")
);


CREATE TABLE IF NOT EXISTS "STUDENT" (
    "ID" VARCHAR(50),
	  "NAME" VARCHAR(25),
  	"SURNAME" VARCHAR(25),
  	"GENDER" VARCHAR(25),
    "NATIONALITY" VARCHAR(25),
    "EMAIL" VARCHAR(50),
    "ENROLLMENT_YEAR" VARCHAR(25),
    "COD_DEGREE" VARCHAR(25),
    FOREIGN KEY("COD_DEGREE") REFERENCES "DEGREE"("COD_DEGREE"),
  	PRIMARY KEY("ID")
);



CREATE TABLE IF NOT EXISTS "TEACHER" (
    "ID" VARCHAR(50),
	  "NAME"	VARCHAR(25),
  	"SURNAME" VARCHAR(25),
    "EMAIL" VARCHAR(50),
  	"COD_GROUP" VARCHAR(25),
    "COD_DEPARTMENT" VARCHAR(25),
    FOREIGN key("COD_GROUP") REFERENCES "GROUP"("COD_GROUP"),
    FOREIGN key("COD_DEPARTMENT") REFERENCES "DEPARTMENT"("COD_DEPARTMENT"),
  	PRIMARY KEY("ID")
);

CREATE TABLE IF NOT EXISTS "STUD_AUTH0" (
	"ID" VARCHAR(50),
	"ID_AUTH0" VARCHAR(50),
    FOREIGN KEY("ID") REFERENCES "STUDENT"("ID"),
  	PRIMARY KEY("ID")
);

CREATE TABLE IF NOT EXISTS "TEACHER_AUTH0" (
	"ID" VARCHAR(50),
	"ID_AUTH0" VARCHAR(50),
    FOREIGN KEY("ID") REFERENCES "TEACHER"("ID"),
  	PRIMARY KEY("ID")
);

CREATE TABLE IF NOT EXISTS "CAREER"(
  	"ID" VARCHAR(50),
  	"COD_COURSE" VARCHAR(25),
    "TITLE_COURSE" VARCHAR(25),
    "CFU" VARCHAR(25),
    "GRADE" INTEGER, 
  	"DATE" VARCHAR(25),
  	FOREIGN KEY("ID") REFERENCES "STUDENT"("ID"),
  	PRIMARY KEY("ID","COD_COURSE")
);

CREATE TABLE IF NOT EXISTS "THESIS"(
  "ID_THESIS" INTEGER NOT NULL,
  "TITLE" VARCHAR(25),
  "DESCRIPTION"  VARCHAR(500),
  "REQUIRED_KNOWLEDGE" VARCHAR(100),
  "NOTES" VARCHAR(500), 
  "EXPIRATION_DATE" VARCHAR(25),
  "LEVEL" VARCHAR(25),
  "DEGREE" VARCHAR(25),
  "SUPERVISOR" VARCHAR(50),
  FOREIGN key("DEGREE") REFERENCES "DEGREE"("COD_DEGREE"),
  FOREIGN key("SUPERVISOR") REFERENCES "TEACHER"("ID"),
  PRIMARY KEY("ID_THESIS" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "THESIS_PROPOSAL"(
  "STUDENT" VARCHAR(50),  
  "THESIS" INTEGER NOT NULL,
  "STATE" INTEGER NOT NULL, /**0 PENDING - 1 ACCETTATA - 2 NON ACCETTATA**/
  FOREIGN key("THESIS") REFERENCES "THESIS"("ID_THESIS"),
  FOREIGN key("STUDENT") REFERENCES "STUDENT"("ID"),
  PRIMARY KEY("STUDENT","THESIS")
);

CREATE TABLE IF NOT EXISTS "THESIS_STATUS"(
  "THESIS" INTEGER NOT NULL,
  "STATE" INTEGER NOT NULL, /**stato può assumere 2 valori --> 1: attiva - 0: archiviata**/
  FOREIGN key("THESIS") REFERENCES "THESIS"("ID_THESIS"),
  PRIMARY KEY("THESIS")
);

CREATE TABLE IF NOT EXISTS "CO_SUPERVISOR"(
  "THESIS" INTEGER NOT NULL,
  "TEACHER" VARCHAR(25),
  FOREIGN key("THESIS") REFERENCES "THESIS"("ID_THESIS"),
  FOREIGN key("TEACHER") REFERENCES "TEACHER"("ID"),
  PRIMARY key("THESIS","TEACHER")
);

CREATE TABLE IF NOT EXISTS "KEYWORD"(
  "THESIS" INTEGER NOT NULL,
  "KEYWORD" VARCHAR(25),
  FOREIGN key("THESIS") REFERENCES "THESIS"("ID_THESIS"),
  PRIMARY key("THESIS","KEYWORD")
);


CREATE TABLE IF NOT EXISTS "TYPE" (
  "THESIS" INTEGER NOT NULL,
  "TYPE" VARCHAR(25),
  FOREIGN key("THESIS") REFERENCES "THESIS"("ID_THESIS"),
  PRIMARY key("THESIS","TYPE")
  );
/**TRACCIATO RECORD**/


/**
Scrivere gli inserimenti nel DB e caricarli su github. Dividere ogni blocco una tabella
**/


INSERT INTO "DEGREE" VALUES("LM-53", "Laurea magistrale in Ingegneria Dei Materiali");
INSERT INTO "DEGREE" VALUES("LM-29", "Laurea magistrale in Ingegneria Elettronica");
INSERT INTO "DEGREE" VALUES("LM-31", "Laurea magistrale in Ingegneria Gestionale");
INSERT INTO "DEGREE" VALUES("LM-33", "Laurea magistrale in Ingegneria Meccanica");
INSERT INTO "DEGREE" VALUES("LM-25", "Laurea magistrale in Mechatronic Engineering");
INSERT INTO "DEGREE" VALUES("LM-32", "Laurea magistrale in Ingegneria Infortmatica");
INSERT INTO "DEGREE" VALUES("LM-20", "Laurea magistrale in Ingegneria Aerospaziale");
INSERT INTO "DEGREE" VALUES("LM-21", "Laurea magistrale in Ingegneria Biomedica");


INSERT INTO "GROUP" VALUES("GR-16", "Software Engineering Group");
INSERT INTO "GROUP" VALUES("GR-05", "Electronic Cad and Reliabilty Check");
INSERT INTO "GROUP" VALUES("GR-13", "Metodi Formali");
INSERT INTO "GROUP" VALUES("GR-04", "Database and Data Mining Group");
INSERT INTO "GROUP" VALUES("GR-10", "Intelligent and Interactive System Group");
INSERT INTO "GROUP" VALUES("AA-01", "Glasses, Ceramics and Composites");
INSERT INTO "GROUP" VALUES("AA-02", "Propulsione Aerospaziale");
INSERT INTO "GROUP" VALUES("RESLOG", "Research and Innovation in Logistics & Project Management");


INSERT INTO "DEPARTMENT" VALUES("DAUIN", "Dipartimento di Automatica e Informatica");
INSERT INTO "DEPARTMENT" VALUES("DIMEAS", "Dipartimento di Ingegneria Meccanica e Aerospaziale");
INSERT INTO "DEPARTMENT" VALUES("DET", "Dipartimento di Elettronica e Telecomunicazioni");
INSERT INTO "DEPARTMENT" VALUES("DISAT", "Dipartimento Scienza Applicata e Tecnologia");
INSERT INTO "DEPARTMENT" VALUES("DIGEP", "Dipartimento di Ingegneria Gestionale e della Produzione");


INSERT INTO "STUDENT" VALUES("s319852", "Evelina Marija", "Bratuhina", "F", "Lettone", "s319852@studenti.polito.it", "2022", "LM-32");
INSERT INTO "STUDENT" VALUES("s313373", "Fabio", "Mangani", "M", "Italiana", "s313373@studenti.polito.it", "2022", "LM-32");
INSERT INTO "STUDENT" VALUES("s317977", "Giacomo", "Cauda", "M", "Italiana", "s317977@studenti.polito.it", "2022", "LM-29");
INSERT INTO "STUDENT" VALUES("s317642", "Gerardo", "Maruotti", "M", "Italiana", "s317642@studenti.polito.it", "2022", "LM-20");
INSERT INTO "STUDENT" VALUES("s317611", "Edoardo", "Morello", "M", "Italiana", "s317611@studenti.polito.it", "2022", "LM-53");


INSERT INTO "TEACHER" VALUES("d123456", "Marco", "Torchiano", "d123456@polito.it", "GR-16", "DAUIN");
INSERT INTO "TEACHER" VALUES("d123457", "Anna Filomena", "Carbone", "d123457@polito.it", "GR-05", "DISAT");
INSERT INTO "TEACHER" VALUES("d123458", "Lorenzo", "Casalino", "d123458@polito.it", "AA-02", "DIMEAS");
INSERT INTO "TEACHER" VALUES("d123459", "Silvia", "Chiusano", "d123459@polito.it", "GR-04", "DAUIN");
INSERT INTO "TEACHER" VALUES("d123460", "Marco", "Sangermano", "d123460@polito.it", "AA-01", "DISAT");
INSERT INTO "TEACHER" VALUES("d123461", "Carlo", "Rafele", "d123461@polito.it", "RESLOG", "DIGEP");
INSERT INTO "TEACHER" VALUES("d123462", "Fulvio", "Corno", "d123462@polito.it", "GR-10", "DAUIN");
INSERT INTO "TEACHER" VALUES("d123463", "Antonio", "Vetrò", "d123463@polito.it", "GR-16", "DAUIN");

INSERT INTO "CAREER" VALUES("s319852", "02GRSOV", "Programmazione di sistema", "10", "27", "04/09/2023");
INSERT INTO "CAREER" VALUES("s319852", "01SQMOV", "Data Science E Tecnologie Per Le Basi Di Dati", "8", "29", "21/02/2023");
INSERT INTO "CAREER" VALUES("s319852", "02KPNOV", "Tecnologie e servizi di rete", "6", "24", "06/09/2023" );
INSERT INTO "CAREER" VALUES("s313373", "01UDFOV", "Applicazioni Web I", "6", "24", "26/06/2023");
INSERT INTO "CAREER" VALUES("s313373", "01SQJOV", "Data Science and Database Technology", "8", "26", "23/01/2023");
INSERT INTO "CAREER" VALUES("s313373", "04GSPOV", "Software engineering", "8", "25", "28/06/2023");
INSERT INTO "CAREER" VALUES("s317977", "05BVCOQ", "Optoelettronica", "6", "26", "21/01/2023");
INSERT INTO "CAREER" VALUES("s317977", "02MXBOQ", "Passive Optical Components", "8", "25", "5/07/2023");
INSERT INTO "CAREER" VALUES("s317642", "02BAQMT", "Gasdinamica", "8", "29", "02/02/2023");
INSERT INTO "CAREER" VALUES("s317642", "03GKZMT", "Sistemi aerospaziali", "8", "28", "30/06/2023");
INSERT INTO "CAREER" VALUES("s317611", "20AXPLS", "Fisica II", "6", "20", "12/02/2023");
INSERT INTO "CAREER" VALUES("s317611", "02CFTLS", "Scienza e tecnologia dei materiali ceramici", "8", "30", "07/07/2023");

INSERT INTO "THESIS" (TITLE,DESCRIPTION,REQUIRED_KNOWLEDGE,NOTES,EXPIRATION_DATE,LEVEL,DEGREE,SUPERVISOR) VALUES("Incrementare la sicurezza di una smart home tramite smart home gateway e MUD", "Le smart home sono abitazioni in grado di gestire una varietà di sistemi domotici come illuminazione, elettrodomestici, finestre, termovalvole, videosorveglianza e molti altri. L'interazione con le smart home è spesso programmabile e possibile anche da remoto. Recenti studi dimostrano come questo tipo di abitazioni, sempre più diffuso, presenti spesso problemi di sicurezza informatica.", "Linguaggio di programmazione della piattaforma: Python; Programmazione orientata agli oggetti", "", "14/12/2023", "MSc", "LM-32", "d123462");
INSERT INTO "THESIS" (TITLE,DESCRIPTION,REQUIRED_KNOWLEDGE,NOTES,EXPIRATION_DATE,LEVEL,DEGREE,SUPERVISOR) VALUES("Data-centric AI: Dataset augmentation techniques for bias and data quality improvement", "Clearbox AI Control Room has a feature to generate synthetic datasets for dataset augmentation. The thesis work is focused in the experimentation of techniques that can help detect bias in the original datasets and mitigate them by augmenting the original dataset using synthetic points. The project will require identifying the types of bias within a dataset and identifying intervention mechanisms to remove the bias using synthetic data generation methods. Clearbox AI is an innovative SME, incubated in I3P, winner of the National Innovation Award (PNI 2019) in the ICT category and the EU Seal of Excellence awarded by the European Commission. Clearbox AI is developing a unique and innovative technology ('AI Control Room'), which allows to put into production artificial intelligence models that are robust, explainable and monitorable over time.", "Good programming skills and basic knowledge of common data analytics tools and techniques. Grade point average equal to or higher than 26 will play a relevant role in the selection.", "When sending your application, we kindly ask you to attach the following information:
- list of exams taken in you master degree, with grades and grade point average
- a résumé or equivalent (e.g., linkedin profile), if you already have one
- by when you aim to graduate and an estimate of the time you can devote to the thesis in a typical week", "30/11/2023", "MSc", "LM-32", "d123456");
INSERT INTO "THESIS" (TITLE,DESCRIPTION,REQUIRED_KNOWLEDGE,NOTES,EXPIRATION_DATE,LEVEL,DEGREE,SUPERVISOR) VALUES("Stampa 3D di resine da fonti biorinnovabili", "Si studieranno formulazioni da fonti bio-rinnovabili fotoreticolabili per la stampa 3D","", "", "30/03/2024", "MSc", "LM-53", "d123460");
INSERT INTO "THESIS" (TITLE,DESCRIPTION,REQUIRED_KNOWLEDGE,NOTES,EXPIRATION_DATE,LEVEL,DEGREE,SUPERVISOR) VALUES("Real Time simulation environment developed with rapid prototyping tool (dSpace system)", "Emergent has extensive experience in development and support of distributed real-time closed-loop hardware-in-the-loop multi-spacecraft simulations. It is required to provide ongoing end-to-end engineering support for systems that enable simulations of spacecraft onboard systems and vehicle orbit and attitude dynamics to help facilitate mission formulation, design, analysis, and hardware trade studies.", "Programming Languages: C/C++, Matlab SimuLink", "The thesis will be developed at Thales AleniaSpace Spa (Turin). After thesis work, Thales AleniaSpace Spa offers an internship opportunity as full-time position for six months.", "31/12/2012", "MSc", "LM-20", "d123458");
INSERT INTO "THESIS" (TITLE,DESCRIPTION,REQUIRED_KNOWLEDGE,NOTES,EXPIRATION_DATE,LEVEL,DEGREE,SUPERVISOR) VALUES("Statistical modeling of genomic sequences", "The information content of a genomic sequence can be measured using various information-theoretic measures, such as entropy, mutual information, and compression complexity. For example, the entropy measures the uncertainty or randomness of the sequence, with higher entropy indicating more randomness and lower entropy indicating more predictability. Mutual information can be used to quantify the dependence between different regions of the genome. Compression complexity quantifies the shortest possible description length of the sequence.", "programming, probability theory, statistical inference", "", "28/03/2024", "MSc", "LM-29", "d123457");


INSERT INTO "THESIS_STATUS" VALUES("1","1");
INSERT INTO "THESIS_STATUS" VALUES("2","1");
INSERT INTO "THESIS_STATUS" VALUES("3","1");
INSERT INTO "THESIS_STATUS" VALUES("4","1");
INSERT INTO "THESIS_STATUS" VALUES("5","1");

INSERT INTO "CO_SUPERVISOR" VALUES("2", "d123463");
INSERT INTO "CO_SUPERVISOR" VALUES("5", "d123458");


INSERT INTO "KEYWORD" VALUES("1", "CYBERSECURITY");
INSERT INTO "KEYWORD" VALUES("1", "SMART HOME");
INSERT INTO "KEYWORD" VALUES("1", "SECURITY");
INSERT INTO "KEYWORD" VALUES("1", "MUD");
INSERT INTO "KEYWORD" VALUES("1", "INTERNET OF THINGS");
INSERT INTO "KEYWORD" VALUES("2", "ALGORITHM FAIRNESS");
INSERT INTO "KEYWORD" VALUES("2", "ARTIFICIAL INTELLIGENCE");
INSERT INTO "KEYWORD" VALUES("2", "DATA ETHICS");
INSERT INTO "KEYWORD" VALUES("2", "DATA QUALITY");
INSERT INTO "KEYWORD" VALUES("2", "DATA SCIENCE");
INSERT INTO "KEYWORD" VALUES("2", "EXPLAINABLE AI");
INSERT INTO "KEYWORD" VALUES("2", "HUMAN-COMPUTER INTERACTION");
INSERT INTO "KEYWORD" VALUES("2", "SYNTHETIC DATA");
INSERT INTO "KEYWORD" VALUES("2", "SOFTWARE ENGINEERING");
INSERT INTO "KEYWORD" VALUES("3", "3-D PRINTING");
INSERT INTO "KEYWORD" VALUES("3", "FOTOPOLIMERIZZAZIONE");
INSERT INTO "KEYWORD" VALUES("4", "AEROSPACE");
INSERT INTO "KEYWORD" VALUES("4", "DIGITAL SYSTEM DESIGN TEST AND VERIFICATION");
INSERT INTO "KEYWORD" VALUES("4", "DSPACE ENVIRONMENT, PROTOTYPING TOOL");
INSERT INTO "KEYWORD" VALUES("4", "REAL TIME SIMULATION, SIMULINK");
INSERT INTO "KEYWORD" VALUES("4", "THALES-ALENIA SPACE");
INSERT INTO "KEYWORD" VALUES("5", "BIOINFORMATICS");
INSERT INTO "KEYWORD" VALUES("5", "COMPUTATIONAL BIOLOGY");

INSERT INTO "TYPE" VALUES ("1","EXPERIMENTAL");
INSERT INTO "TYPE" VALUES ("2","AZIENDALE");
INSERT INTO "TYPE" VALUES ("2","EXPERIMENTAL");
INSERT INTO "TYPE" VALUES ("2","RESEARCH");
INSERT INTO "TYPE" VALUES ("2","SPERIMENTALE APPLICATA");
INSERT INTO "TYPE" VALUES ("2","SPERIMENTALE IN AZIENDA");
INSERT INTO "TYPE" VALUES ("3","EXPERIMENTAL");
INSERT INTO "TYPE" VALUES ("4","EXPERIMENTAL");
INSERT INTO "TYPE" VALUES ("5","RESEARCH");
