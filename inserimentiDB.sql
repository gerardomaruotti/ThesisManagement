BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS "DEGREE" (
	"COD_DEGREE"	VARCHAR(25),
	"TITLE_DEGREE"	VARCHAR(100),
	PRIMARY KEY("COD_DEGREE")
);


CREATE TABLE IF NOT EXISTS "GROUP" (
	"COD_GROUP"	VARCHAR(25),
	"NAME"	VARCHAR(25),
	PRIMARY KEY("COD_GROUP")
);


CREATE TABLE IF NOT EXISTS "DEPARTMENT" (
	"COD_DEPARTMENT"	VARCHAR(25),
	"NAME"	VARCHAR(25),
	PRIMARY KEY("COD_DEPARTMENT")
);


CREATE TABLE IF NOT EXISTS "STUDENT" (
	"ID"	VARCHAR(50),
	"NAME"	VARCHAR(25),
	"SURNAME"	VARCHAR(25),
	"GENDER"	VARCHAR(25),
	"NATIONALITY"	VARCHAR(25),
	"EMAIL"	VARCHAR(50),
	"ENROLLMENT_YEAR"	VARCHAR(25),
	"COD_DEGREE"	VARCHAR(25),
	FOREIGN KEY("COD_DEGREE") REFERENCES "DEGREE"("COD_DEGREE"),
	PRIMARY KEY("ID")
);


CREATE TABLE IF NOT EXISTS "TEACHER" (
	"ID"	VARCHAR(50),
	"NAME"	VARCHAR(25),
	"SURNAME"	VARCHAR(25),
	"EMAIL"	VARCHAR(50),
	"COD_GROUP"	VARCHAR(25),
	"COD_DEPARTMENT"	VARCHAR(25),
	FOREIGN KEY("COD_DEPARTMENT") REFERENCES "DEPARTMENT"("COD_DEPARTMENT"),
	FOREIGN KEY("COD_GROUP") REFERENCES "GROUP"("COD_GROUP"),
	PRIMARY KEY("ID")
);


CREATE TABLE IF NOT EXISTS "STUD_AUTH0" (
	"ID"	VARCHAR(50),
	"ID_AUTH0"	VARCHAR(50),
	FOREIGN KEY("ID") REFERENCES "STUDENT"("ID"),
	PRIMARY KEY("ID")
);
CREATE TABLE IF NOT EXISTS "TEACHER_AUTH0" (
	"ID"	VARCHAR(50),
	"ID_AUTH0"	VARCHAR(50),
	FOREIGN KEY("ID") REFERENCES "TEACHER"("ID"),
	PRIMARY KEY("ID")
);


CREATE TABLE IF NOT EXISTS "CAREER" (
	"ID"	VARCHAR(50),
	"COD_COURSE"	VARCHAR(25),
	"TITLE_COURSE"	VARCHAR(25),
	"CFU"	VARCHAR(25),
	"GRADE"	INTEGER,
	"DATE"	VARCHAR(25),
	FOREIGN KEY("ID") REFERENCES "STUDENT"("ID"),
	PRIMARY KEY("ID","COD_COURSE")
);



CREATE TABLE IF NOT EXISTS "THESIS" (
	"ID_THESIS"	INTEGER NOT NULL,
	"TITLE"	VARCHAR(25),
	"DESCRIPTION"	VARCHAR(500),
	"REQUIRED_KNOWLEDGE"	VARCHAR(100),
	"NOTES"	VARCHAR(500),
	"EXPIRATION_DATE"	VARCHAR(25),
	"LEVEL"	   VARCHAR(25),
	"DEGREE"	VARCHAR(25),
	"SUPERVISOR"	VARCHAR(50),
	FOREIGN KEY("DEGREE") REFERENCES "DEGREE"("COD_DEGREE"),
	FOREIGN KEY("SUPERVISOR") REFERENCES "TEACHER"("ID"),
	PRIMARY KEY("ID_THESIS" AUTOINCREMENT)
);


CREATE TABLE IF NOT EXISTS "THESIS_APPLICATION" (
	"ID_APPLICATION" INTEGER NOT NULL,
	"STUDENT"	VARCHAR(50),
	"THESIS"	INTEGER NOT NULL,
	"STATE"		INTEGER NOT NULL,
	FOREIGN KEY("THESIS") REFERENCES "THESIS"("ID_THESIS"),
	FOREIGN KEY("STUDENT") REFERENCES "STUDENT"("ID"),
	PRIMARY KEY("ID_APPLICATION" AUTOINCREMENT)
);


CREATE TABLE IF NOT EXISTS "THESIS_STATUS" (
	"THESIS"	INTEGER NOT NULL,
	"STATE"	INTEGER NOT NULL,
	FOREIGN KEY("THESIS") REFERENCES "THESIS"("ID_THESIS"),
	PRIMARY KEY("THESIS")
);

CREATE TABLE IF NOT EXISTS "CO_SUPERVISOR" (
	"THESIS"	INTEGER NOT NULL,
	"NAME"		VARCHAR(25),
	"SURNAME"	VARCHAR(25),
	"EMAIL"		VARCHAR(50),
	FOREIGN KEY("THESIS") REFERENCES "THESIS"("ID_THESIS"),
	PRIMARY KEY("THESIS","EMAIL")
);


CREATE TABLE IF NOT EXISTS "KEYWORD" (
	"THESIS"	INTEGER NOT NULL,
	"KEYWORD"	VARCHAR(25),
	PRIMARY KEY("THESIS","KEYWORD"),
	FOREIGN KEY("THESIS") REFERENCES "THESIS"("ID_THESIS")
);


CREATE TABLE IF NOT EXISTS "TYPE" (
	"THESIS"	INTEGER NOT NULL,
	"TYPE"	VARCHAR(25),
	PRIMARY KEY("THESIS","TYPE"),
	FOREIGN KEY("THESIS") REFERENCES "THESIS"("ID_THESIS")
);



INSERT INTO "DEGREE" ("COD_DEGREE","TITLE_DEGREE") VALUES ('LM-53','Laurea magistrale in Ingegneria Dei Materiali');
INSERT INTO "DEGREE" ("COD_DEGREE","TITLE_DEGREE") VALUES ('LM-29','Laurea magistrale in Ingegneria Elettronica');
INSERT INTO "DEGREE" ("COD_DEGREE","TITLE_DEGREE") VALUES ('LM-31','Laurea magistrale in Ingegneria Gestionale');
INSERT INTO "DEGREE" ("COD_DEGREE","TITLE_DEGREE") VALUES ('LM-33','Laurea magistrale in Ingegneria Meccanica');
INSERT INTO "DEGREE" ("COD_DEGREE","TITLE_DEGREE") VALUES ('LM-25','Laurea magistrale in Mechatronic Engineering');
INSERT INTO "DEGREE" ("COD_DEGREE","TITLE_DEGREE") VALUES ('LM-32','Laurea magistrale in Ingegneria Infortmatica');
INSERT INTO "DEGREE" ("COD_DEGREE","TITLE_DEGREE") VALUES ('LM-20','Laurea magistrale in Ingegneria Aerospaziale');
INSERT INTO "DEGREE" ("COD_DEGREE","TITLE_DEGREE") VALUES ('LM-21','Laurea magistrale in Ingegneria Biomedica');
INSERT INTO "DEGREE" ("COD_DEGREE","TITLE_DEGREE") VALUES ('L-8','Laurea in Ingegneria Informatica');
INSERT INTO "DEGREE" ("COD_DEGREE","TITLE_DEGREE") VALUES ('L-9','Laurea in Ingegneria Chimica');


INSERT INTO "GROUP" ("COD_GROUP","NAME") VALUES ('GR-16','Software Engineering Group');
INSERT INTO "GROUP" ("COD_GROUP","NAME") VALUES ('GR-05','Electronic Cad and Reliabilty Check');
INSERT INTO "GROUP" ("COD_GROUP","NAME") VALUES ('GR-13','Metodi Formali');
INSERT INTO "GROUP" ("COD_GROUP","NAME") VALUES ('GR-04','Database and Data Mining Group');
INSERT INTO "GROUP" ("COD_GROUP","NAME") VALUES ('GR-10','Intelligent and Interactive System Group');
INSERT INTO "GROUP" ("COD_GROUP","NAME") VALUES ('AA-01','Glasses, Ceramics and Composites');
INSERT INTO "GROUP" ("COD_GROUP","NAME") VALUES ('AA-02','Propulsione Aerospaziale');
INSERT INTO "GROUP" ("COD_GROUP","NAME") VALUES ('RESLOG','Research and Innovation in Logistics & Project Management');


INSERT INTO "DEPARTMENT" ("COD_DEPARTMENT","NAME") VALUES ('DAUIN','Dipartimento di Automatica e Informatica');
INSERT INTO "DEPARTMENT" ("COD_DEPARTMENT","NAME") VALUES ('DIMEAS','Dipartimento di Ingegneria Meccanica e Aerospaziale');
INSERT INTO "DEPARTMENT" ("COD_DEPARTMENT","NAME") VALUES ('DET','Dipartimento di Elettronica e Telecomunicazioni');
INSERT INTO "DEPARTMENT" ("COD_DEPARTMENT","NAME") VALUES ('DISAT','Dipartimento Scienza Applicata e Tecnologia');
INSERT INTO "DEPARTMENT" ("COD_DEPARTMENT","NAME") VALUES ('DIGEP','Dipartimento di Ingegneria Gestionale e della Produzione');


INSERT INTO "STUDENT" ("ID","NAME","SURNAME","GENDER","NATIONALITY","EMAIL","ENROLLMENT_YEAR","COD_DEGREE") VALUES ('s319852','Evelina Marija','Bratuhina','F','Lettone','s319852@studenti.polito.it','2022','LM-32');
INSERT INTO "STUDENT" ("ID","NAME","SURNAME","GENDER","NATIONALITY","EMAIL","ENROLLMENT_YEAR","COD_DEGREE") VALUES ('s313373','Fabio','Mangani','M','Italiana','s313373@studenti.polito.it','2022','LM-32');
INSERT INTO "STUDENT" ("ID","NAME","SURNAME","GENDER","NATIONALITY","EMAIL","ENROLLMENT_YEAR","COD_DEGREE") VALUES ('s319854','Riccardo','Simeone','M','Italiana','s319854@studenti.polito.it','2022','LM-32');
INSERT INTO "STUDENT" ("ID","NAME","SURNAME","GENDER","NATIONALITY","EMAIL","ENROLLMENT_YEAR","COD_DEGREE") VALUES ('s317977','Giacomo','Cauda','M','Italiana','s317977@studenti.polito.it','2022','LM-29');
INSERT INTO "STUDENT" ("ID","NAME","SURNAME","GENDER","NATIONALITY","EMAIL","ENROLLMENT_YEAR","COD_DEGREE") VALUES ('s317642','Gerardo','Maruotti','M','Italiana','s317642@studenti.polito.it','2022','LM-20');
INSERT INTO "STUDENT" ("ID","NAME","SURNAME","GENDER","NATIONALITY","EMAIL","ENROLLMENT_YEAR","COD_DEGREE") VALUES ('s317611','Edoardo','Morello','M','Italiana','s317611@studenti.polito.it','2022','LM-53');
INSERT INTO "STUDENT" ("ID","NAME","SURNAME","GENDER","NATIONALITY","EMAIL","ENROLLMENT_YEAR","COD_DEGREE") VALUES ('s315327','Davide','Vilella','M','Italiana','s315327@studenti.polito.it','2022','LM-31');
INSERT INTO "STUDENT" ("ID","NAME","SURNAME","GENDER","NATIONALITY","EMAIL","ENROLLMENT_YEAR","COD_DEGREE") VALUES ('s318927','Andrea','Scamporrino','M','Italiana','s318927@studenti.polito.it','2022','LM-33');



INSERT INTO "TEACHER" ("ID","NAME","SURNAME","EMAIL","COD_GROUP","COD_DEPARTMENT") VALUES ('d123456','Marco','Torchiano','d123456@polito.it','GR-16','DAUIN');
INSERT INTO "TEACHER" ("ID","NAME","SURNAME","EMAIL","COD_GROUP","COD_DEPARTMENT") VALUES ('d123457','Anna Filomena','Carbone','d123457@polito.it','GR-05','DISAT');
INSERT INTO "TEACHER" ("ID","NAME","SURNAME","EMAIL","COD_GROUP","COD_DEPARTMENT") VALUES ('d123458','Lorenzo','Casalino','d123458@polito.it','AA-02','DIMEAS');
INSERT INTO "TEACHER" ("ID","NAME","SURNAME","EMAIL","COD_GROUP","COD_DEPARTMENT") VALUES ('d123459','Silvia','Chiusano','d123459@polito.it','GR-04','DAUIN');
INSERT INTO "TEACHER" ("ID","NAME","SURNAME","EMAIL","COD_GROUP","COD_DEPARTMENT") VALUES ('d111111','Marco','Sangermano','d111111@polito.it','AA-01','DISAT');
INSERT INTO "TEACHER" ("ID","NAME","SURNAME","EMAIL","COD_GROUP","COD_DEPARTMENT") VALUES ('d123461','Carlo','Rafele','d123461@polito.it','RESLOG','DIGEP');
INSERT INTO "TEACHER" ("ID","NAME","SURNAME","EMAIL","COD_GROUP","COD_DEPARTMENT") VALUES ('d123462','Fulvio','Corno','d123462@polito.it','GR-10','DAUIN');
INSERT INTO "TEACHER" ("ID","NAME","SURNAME","EMAIL","COD_GROUP","COD_DEPARTMENT") VALUES ('d123463','Antonio','Vetrò','d123463@polito.it','GR-16','DAUIN');


INSERT INTO "STUD_AUTH0" ("ID","ID_AUTH0") VALUES ('s313373','auth0|654caa9c50ddd0e01984fe64');
INSERT INTO "STUD_AUTH0" ("ID","ID_AUTH0") VALUES ('s317977','auth0|655f9462022f6b2083b35623');
INSERT INTO "STUD_AUTH0" ("ID","ID_AUTH0") VALUES ('s319852','auth0|6552613d2d58c43c6805bc5a');
INSERT INTO "STUD_AUTH0" ("ID","ID_AUTH0") VALUES ('s319854','auth0|655f94e1022f6b2083b356ac');
INSERT INTO "STUD_AUTH0" ("ID","ID_AUTH0") VALUES ('s315327','auth0|655f9507022f6b2083b356d0');
INSERT INTO "STUD_AUTH0" ("ID","ID_AUTH0") VALUES ('s317611','auth0|6552618d2d58c43c6805bc74');
INSERT INTO "STUD_AUTH0" ("ID","ID_AUTH0") VALUES ('s318927','auth0|654caac150ddd0e01984fe84');
INSERT INTO "STUD_AUTH0" ("ID","ID_AUTH0") VALUES ('s317642','auth0|654ca958501d0a3a0de1ab4c');


INSERT INTO "TEACHER_AUTH0" ("ID","ID_AUTH0") VALUES ('d123456','auth0|654f41a17a8e265bbdac8830');
INSERT INTO "TEACHER_AUTH0" ("ID","ID_AUTH0") VALUES ('d111111','auth0|655262d32d58c43c6805bd0b');
INSERT INTO "TEACHER_AUTH0" ("ID","ID_AUTH0") VALUES ('d123457','auth0|655f955aed81aad0fed3de7c');
INSERT INTO "TEACHER_AUTH0" ("ID","ID_AUTH0") VALUES ('d123458','auth0|655f957fed81aad0fed3dea4');
INSERT INTO "TEACHER_AUTH0" ("ID","ID_AUTH0") VALUES ('d123459','auth0|655f95a4ed81aad0fed3dec6');
INSERT INTO "TEACHER_AUTH0" ("ID","ID_AUTH0") VALUES ('d123461','auth0|655f95c1ed81aad0fed3deed');
INSERT INTO "TEACHER_AUTH0" ("ID","ID_AUTH0") VALUES ('d123462','auth0|655f95ee022f6b2083b357da');
INSERT INTO "TEACHER_AUTH0" ("ID","ID_AUTH0") VALUES ('d123463','auth0|655f960ced81aad0fed3df3c');


INSERT INTO "CAREER" ("ID","COD_COURSE","TITLE_COURSE","CFU","GRADE","DATE") VALUES ('s319852','02GRSOV','Programmazione di sistema','10',27,'04/09/2023');
INSERT INTO "CAREER" ("ID","COD_COURSE","TITLE_COURSE","CFU","GRADE","DATE") VALUES ('s319852','01SQMOV','Data Science E Tecnologie Per Le Basi Di Dati','8',29,'21/02/2023');
INSERT INTO "CAREER" ("ID","COD_COURSE","TITLE_COURSE","CFU","GRADE","DATE") VALUES ('s319852','02KPNOV','Tecnologie e servizi di rete','6',24,'06/09/2023');
INSERT INTO "CAREER" ("ID","COD_COURSE","TITLE_COURSE","CFU","GRADE","DATE") VALUES ('s313373','01UDFOV','Applicazioni Web I','6',24,'26/06/2023');
INSERT INTO "CAREER" ("ID","COD_COURSE","TITLE_COURSE","CFU","GRADE","DATE") VALUES ('s313373','01SQJOV','Data Science and Database Technology','8',26,'23/01/2023');
INSERT INTO "CAREER" ("ID","COD_COURSE","TITLE_COURSE","CFU","GRADE","DATE") VALUES ('s313373','04GSPOV','Software engineering','8',25,'28/06/2023');
INSERT INTO "CAREER" ("ID","COD_COURSE","TITLE_COURSE","CFU","GRADE","DATE") VALUES ('s317977','05BVCOQ','Optoelettronica','6',26,'21/01/2023');
INSERT INTO "CAREER" ("ID","COD_COURSE","TITLE_COURSE","CFU","GRADE","DATE") VALUES ('s317977','02MXBOQ','Passive Optical Components','8',25,'5/07/2023');
INSERT INTO "CAREER" ("ID","COD_COURSE","TITLE_COURSE","CFU","GRADE","DATE") VALUES ('s317642','02BAQMT','Gasdinamica','8',29,'02/02/2023');
INSERT INTO "CAREER" ("ID","COD_COURSE","TITLE_COURSE","CFU","GRADE","DATE") VALUES ('s317642','03GKZMT','Sistemi aerospaziali','8',28,'30/06/2023');
INSERT INTO "CAREER" ("ID","COD_COURSE","TITLE_COURSE","CFU","GRADE","DATE") VALUES ('s317611','20AXPLS','Fisica II','6',20,'12/02/2023');
INSERT INTO "CAREER" ("ID","COD_COURSE","TITLE_COURSE","CFU","GRADE","DATE") VALUES ('s317611','02CFTLS','Scienza e tecnologia dei materiali ceramici','8',30,'07/07/2023');



INSERT INTO "THESIS" ("ID_THESIS","TITLE","DESCRIPTION","REQUIRED_KNOWLEDGE","NOTES","EXPIRATION_DATE","LEVEL","DEGREE","SUPERVISOR") VALUES (1,'Incrementare la sicurezza di una smart home tramite smart home gateway e MUD','Le smart home sono abitazioni in grado di gestire una varietà di sistemi domotici come illuminazione, elettrodomestici, finestre, termovalvole, videosorveglianza e molti altri. L''interazione con le smart home è spesso programmabile e possibile anche da remoto. Recenti studi dimostrano come questo tipo di abitazioni, sempre più diffuso, presenti spesso problemi di sicurezza informatica.','Linguaggio di programmazione della piattaforma: Python; Programmazione orientata agli oggetti','','14/12/2023','MSc','LM-32','d123462');

INSERT INTO "THESIS" ("ID_THESIS","TITLE","DESCRIPTION","REQUIRED_KNOWLEDGE","NOTES","EXPIRATION_DATE","LEVEL","DEGREE","SUPERVISOR") VALUES (2,'Data-centric AI: Dataset augmentation techniques for bias and data quality improvement','Clearbox AI Control Room has a feature to generate synthetic datasets for dataset augmentation. The thesis work is focused in the experimentation of techniques that can help detect bias in the original datasets and mitigate them by augmenting the original dataset using synthetic points. The project will require identifying the types of bias within a dataset and identifying intervention mechanisms to remove the bias using synthetic data generation methods. Clearbox AI is an innovative SME, incubated in I3P, winner of the National Innovation Award (PNI 2019) in the ICT category and the EU Seal of Excellence awarded by the European Commission. Clearbox AI is developing a unique and innovative technology (''AI Control Room''), which allows to put into production artificial intelligence models that are robust, explainable and monitorable over time.','Good programming skills and basic knowledge of common data analytics tools and techniques. Grade point average equal to or higher than 26 will play a relevant role in the selection.','When sending your application, we kindly ask you to attach the following information:

- list of exams taken in you master degree, with grades and grade point average

- a résumé or equivalent (e.g., linkedin profile), if you already have one

- by when you aim to graduate and an estimate of the time you can devote to the thesis in a typical week','30/11/2023','MSc','LM-32','d123456');

INSERT INTO "THESIS" ("ID_THESIS","TITLE","DESCRIPTION","REQUIRED_KNOWLEDGE","NOTES","EXPIRATION_DATE","LEVEL","DEGREE","SUPERVISOR") VALUES (3,'Stampa 3D di resine da fonti biorinnovabili','Si studieranno formulazioni da fonti bio-rinnovabili fotoreticolabili per la stampa 3D','','','30/03/2024','MSc','LM-53','d111111');

INSERT INTO "THESIS" ("ID_THESIS","TITLE","DESCRIPTION","REQUIRED_KNOWLEDGE","NOTES","EXPIRATION_DATE","LEVEL","DEGREE","SUPERVISOR") VALUES (4,'Real Time simulation environment developed with rapid prototyping tool (dSpace system)','Emergent has extensive experience in development and support of distributed real-time closed-loop hardware-in-the-loop multi-spacecraft simulations. It is required to provide ongoing end-to-end engineering support for systems that enable simulations of spacecraft onboard systems and vehicle orbit and attitude dynamics to help facilitate mission formulation, design, analysis, and hardware trade studies.','Programming Languages: C/C++, Matlab SimuLink','The thesis will be developed at Thales AleniaSpace Spa (Turin). After thesis work, Thales AleniaSpace Spa offers an internship opportunity as full-time position for six months.','31/12/2012','MSc','LM-20','d123458');

INSERT INTO "THESIS" ("ID_THESIS","TITLE","DESCRIPTION","REQUIRED_KNOWLEDGE","NOTES","EXPIRATION_DATE","LEVEL","DEGREE","SUPERVISOR") VALUES (5,'Statistical modeling of genomic sequences','The information content of a genomic sequence can be measured using various information-theoretic measures, such as entropy, mutual information, and compression complexity. For example, the entropy measures the uncertainty or randomness of the sequence, with higher entropy indicating more randomness and lower entropy indicating more predictability. Mutual information can be used to quantify the dependence between different regions of the genome. Compression complexity quantifies the shortest possible description length of the sequence.','programming, probability theory, statistical inference','','28/03/2024','MSc','LM-29','d123457');


INSERT INTO "THESIS" ("ID_THESIS","TITLE","DESCRIPTION","REQUIRED_KNOWLEDGE","NOTES","EXPIRATION_DATE","LEVEL","DEGREE","SUPERVISOR") VALUES (6,'Exploring the Impact of Technological Integration on Educational Outcomes in Middle Schools','The thesis proposal will involve a comprehensive literature review to provide a theoretical background on technology integration in education, Research methodology will include a mixed methods approach, combining both quantitative and qualitative data collection methods, Data collection may involve conducting surveys and interviews with middle school teachers, students, and administrators, as well as analyzing academic performance data, The proposal will address ethical considerations in research, such as obtaining informed consent and ensuring participant confidentiality, Time management and organization skills will be necessary to ensure completion of the study within the proposed timeframe, Collaboration and communication with middle school stakeholders will be crucial for obtaining necessary permissions and support for the research, The proposal will include a detailed plan for analysis and interpretation of data, as well as recommendations for educational practices and policy implications.','Familiarity with educational theories and pedagogical approaches, Understanding of technology integration and its potential impact on classroom dynamics, Basic knowledge of research methods and data analysis.
','This thesis proposal aims to investigate the influence of technology integration on educational outcomes in middle schools. It seeks to explore whether the integration of technology in teaching and learning practices enhances student engagement, academic performance, and motivation. Additionally, it aims to identify the barriers and challenges that educators face in effectively implementing technology in the classroom.
','16/08/2024','MSc','LM-29','d111111');


INSERT INTO "THESIS" ("ID_THESIS","TITLE","DESCRIPTION","REQUIRED_KNOWLEDGE","NOTES","EXPIRATION_DATE","LEVEL","DEGREE","SUPERVISOR") VALUES (7,'Optimizing Energy Efficiency in Industrial Processes using Machine Learning Techniques','This thesis aims to explore the application of machine learning algorithms in optimizing energy efficiency in industrial processes. Industrial processes consume a significant amount of energy, and improving their efficiency can have substantial environmental and economic benefits. By leveraging collected data from sensors and other sources, machine learning algorithms identify patterns and develop models to predict energy consumption, optimize process parameters, and recommend energy-saving measures. This research will analyze different machine learning techniques such as regression, classification, and clustering algorithms to identify the most effective approach for optimizing energy efficiency in diverse industrial processes.','Strong understanding of engineering principles, particularly in the fields of energy systems, process optimization, and industrial automation. Familiarity with machine learning algorithms and techniques, including regression, classification, and clustering. Proficiency in programming languages commonly used in machine learning, such as Python or R. Knowledge of data preprocessing techniques, feature engineering, and model evaluation methods. Ability to work with large datasets and implement machine learning algorithms using appropriate libraries or frameworks. Familiarity with industrial processes and energy management practices would be beneficial.','The thesis will investigate the feasibility and effectiveness of using machine learning algorithms in optimizing energy efficiency in various industrial settings, including manufacturing, chemical plants, and power generation. Data preprocessing techniques will be explored for cleaning, transforming, and analyzing the data collected from sensors and other sources. The selected machine learning algorithms will be implemented and tested on real-world industrial datasets to evaluate their performance and accuracy in predicting energy consumption and optimizing process parameters. The thesis will also investigate challenges and limitations associated with implementing machine learning techniques in industrial environments, such as data quality, model interpretability, and deployment considerations. The findings of this research will provide key insights into the practical implementation of machine learning techniques to improve energy efficiency in industrial processes, contributing to sustainable development and cost savings.
','24/07/2024','MSc','LM-32','d111111');


INSERT INTO "THESIS" ("ID_THESIS","TITLE","DESCRIPTION","REQUIRED_KNOWLEDGE","NOTES","EXPIRATION_DATE","LEVEL","DEGREE","SUPERVISOR") VALUES (8,'ARMADA: A Framework for Automatic Hardware Design Debugging and Repair','In recent years, there has been an exponential growth in the size and complexity of System-on-Chip (SoC) designs targeting different specialized applications. The cost of an undetected bug in these systems is much higher than in traditional processor systems, as it may imply the loss of property or life. The problem is further exacerbated by the ever-shrinking time-to-market and ever-increasing design complexity and demand to churn out billions of hardware devices. Despite decades of research in simulation and formal methods for debugging and verifying pre-silicon register transfer level (RTL) design, RTL debugging is still one of the most time-consuming and resource-intensive processes in the contemporary hardware design cycle. Current industrial practice primarily uses regression techniques and what-if analysis for debugging. However, such methods are extremely time-consuming and often rely on deep insights from human experts. On the other hand, academic researchers have proposed automated debugging techniques using data-driven statistical analysis, SAT, and BDD. However, such methods often suffer from scalability issues, do not provide human-comprehensible explanations of failure root causes, and do not automatically create code patches to fix buggy designs. This project will address this critical problem by creating ARMADA, a new foundational infrastructure, and a comprehensive tool suite for pre-silicon RTL debugging. A critical insight is that recent advances in state-of-the-art deep learning models, such as Transformer, Large Language Models (LLMs), have enormous potential to root cause and localize, explain root causes that are human understandable, and generate code patches to debug the RTL designs. We propose integrating this insight in ARMADA to create a novel, scalable, and effective pre-silicon debugging and repairing framework.

Intellectual Merit
The project will develop a unified foundational infrastructure and comprehensive suite of tools to enable streamlined pre-silicon RTL debugging and repairing of realistic SoCs.
(1) It will develop novel technologies for characterizing and classifying design failure traces for effective debugging and root cause analysis.
(2) It will create a framework for automatically localizing suspicious design components and design source codes.
(3) It will develop a framework to generate human-understandable explanations of design failures at different abstractions in natural language.
(4) It will develop novel technologies to automatically generate fixes, i.e., code patches to repair suspicious design components. The proposed approaches will be demonstrated on complex, realistic, industry-scale SoC designs.','Advanced programming skills, basics of data analytics, computer architectures, testing and verification of hardware devices.','The thesis is expected to be carried out under the tutelage of Prof. Debjit Pal at the University of Illinois at Chicago. Visa paperwork will be handled by the University of Chicago offices. All other expenses will be borne by the student. In case of particular impediments, the thesis can be developed at Politecnico.','18/11/2023','MSc','LM-29','d111111');


INSERT INTO "THESIS_APPLICATION" ("ID_APPLICATION","STUDENT","THESIS","STATE") VALUES (1,'s313373',2,0);
INSERT INTO "THESIS_APPLICATION" ("ID_APPLICATION","STUDENT","THESIS","STATE") VALUES (2,'s317611',3,1);
INSERT INTO "THESIS_APPLICATION" ("ID_APPLICATION","STUDENT","THESIS","STATE") VALUES (3,'s317977',6,0);
INSERT INTO "THESIS_APPLICATION" ("ID_APPLICATION","STUDENT","THESIS","STATE") VALUES (4,'s317977',5,0);
INSERT INTO "THESIS_APPLICATION" ("ID_APPLICATION","STUDENT","THESIS","STATE") VALUES (5,'s319852',7,0);
INSERT INTO "THESIS_APPLICATION" ("ID_APPLICATION","STUDENT","THESIS","STATE") VALUES (6,'s313373',7,0);

INSERT INTO "THESIS_STATUS" ("THESIS","STATE") VALUES (1,1);
INSERT INTO "THESIS_STATUS" ("THESIS","STATE") VALUES (2,1);
INSERT INTO "THESIS_STATUS" ("THESIS","STATE") VALUES (3,0);
INSERT INTO "THESIS_STATUS" ("THESIS","STATE") VALUES (4,0);
INSERT INTO "THESIS_STATUS" ("THESIS","STATE") VALUES (5,1);
INSERT INTO "THESIS_STATUS" ("THESIS","STATE") VALUES (6,1);
INSERT INTO "THESIS_STATUS" ("THESIS","STATE") VALUES (7,1);
INSERT INTO "THESIS_STATUS" ("THESIS","STATE") VALUES (8,1);


INSERT INTO "CO_SUPERVISOR" ("THESIS","NAME","SURNAME","EMAIL") VALUES (2,'Antonio','Vetrò','d123463@polito.it');
INSERT INTO "CO_SUPERVISOR" ("THESIS","NAME","SURNAME","EMAIL") VALUES (5,'Lorenzo',' Casalino','d123458@polito.it');
INSERT INTO "CO_SUPERVISOR" ("THESIS","NAME","SURNAME","EMAIL") VALUES (6,'Marco','Torchiano','d123456@polito.it');
INSERT INTO "CO_SUPERVISOR" ("THESIS","NAME","SURNAME","EMAIL") VALUES (6,'Anna Filomena','Carbone','d123457@polito.it');
INSERT INTO "CO_SUPERVISOR" ("THESIS","NAME","SURNAME","EMAIL") VALUES (7,'Antonio','Vetrò','d123463@polito.it');
INSERT INTO "CO_SUPERVISOR" ("THESIS","NAME","SURNAME","EMAIL") VALUES (7,'Carlo','Rafele','d123461@polito.it');
INSERT INTO "CO_SUPERVISOR" ("THESIS","NAME","SURNAME","EMAIL") VALUES (7,'Fulvio','Corno','d123462@polito.it');
INSERT INTO "CO_SUPERVISOR" ("THESIS","NAME","SURNAME","EMAIL") VALUES (8,'Marco','Torchiano','d123456@polito.it');


INSERT INTO "KEYWORD" ("THESIS","KEYWORD") VALUES (1,'CYBERSECURITY');
INSERT INTO "KEYWORD" ("THESIS","KEYWORD") VALUES (1,'SMART HOME');
INSERT INTO "KEYWORD" ("THESIS","KEYWORD") VALUES (1,'SECURITY');
INSERT INTO "KEYWORD" ("THESIS","KEYWORD") VALUES (1,'MUD');
INSERT INTO "KEYWORD" ("THESIS","KEYWORD") VALUES (1,'INTERNET OF THINGS');
INSERT INTO "KEYWORD" ("THESIS","KEYWORD") VALUES (2,'ALGORITHM FAIRNESS');
INSERT INTO "KEYWORD" ("THESIS","KEYWORD") VALUES (2,'ARTIFICIAL INTELLIGENCE');
INSERT INTO "KEYWORD" ("THESIS","KEYWORD") VALUES (2,'DATA ETHICS');
INSERT INTO "KEYWORD" ("THESIS","KEYWORD") VALUES (2,'DATA QUALITY');
INSERT INTO "KEYWORD" ("THESIS","KEYWORD") VALUES (2,'DATA SCIENCE');
INSERT INTO "KEYWORD" ("THESIS","KEYWORD") VALUES (2,'EXPLAINABLE AI');
INSERT INTO "KEYWORD" ("THESIS","KEYWORD") VALUES (2,'HUMAN-COMPUTER INTERACTION');
INSERT INTO "KEYWORD" ("THESIS","KEYWORD") VALUES (2,'SYNTHETIC DATA');
INSERT INTO "KEYWORD" ("THESIS","KEYWORD") VALUES (2,'SOFTWARE ENGINEERING');
INSERT INTO "KEYWORD" ("THESIS","KEYWORD") VALUES (3,'3-D PRINTING');
INSERT INTO "KEYWORD" ("THESIS","KEYWORD") VALUES (3,'FOTOPOLIMERIZZAZIONE');
INSERT INTO "KEYWORD" ("THESIS","KEYWORD") VALUES (4,'AEROSPACE');
INSERT INTO "KEYWORD" ("THESIS","KEYWORD") VALUES (4,'DIGITAL SYSTEM DESIGN TEST AND VERIFICATION');
INSERT INTO "KEYWORD" ("THESIS","KEYWORD") VALUES (4,'DSPACE ENVIRONMENT, PROTOTYPING TOOL');
INSERT INTO "KEYWORD" ("THESIS","KEYWORD") VALUES (4,'REAL TIME SIMULATION, SIMULINK');
INSERT INTO "KEYWORD" ("THESIS","KEYWORD") VALUES (4,'THALES-ALENIA SPACE');
INSERT INTO "KEYWORD" ("THESIS","KEYWORD") VALUES (5,'BIOINFORMATICS');
INSERT INTO "KEYWORD" ("THESIS","KEYWORD") VALUES (5,'COMPUTATIONAL BIOLOGY');
INSERT INTO "KEYWORD" ("THESIS","KEYWORD") VALUES (6,'CYBERSECURITY');
INSERT INTO "KEYWORD" ("THESIS","KEYWORD") VALUES (6,'ARTIFICIAL INTELLIGENCE');
INSERT INTO "KEYWORD" ("THESIS","KEYWORD") VALUES (7,'ARTIFICIAL INTELLIGENCE');
INSERT INTO "KEYWORD" ("THESIS","KEYWORD") VALUES (7,'MACHINE LEARNING');
INSERT INTO "KEYWORD" ("THESIS","KEYWORD") VALUES (8,'CYBERSECURITY');
INSERT INTO "KEYWORD" ("THESIS","KEYWORD") VALUES (8,'INTERNET OF THINGS');
INSERT INTO "KEYWORD" ("THESIS","KEYWORD") VALUES (8,'MUD');
INSERT INTO "KEYWORD" ("THESIS","KEYWORD") VALUES (8,'DATA ETHICS');
INSERT INTO "KEYWORD" ("THESIS","KEYWORD") VALUES (8,'DATA QUALITY');
INSERT INTO "KEYWORD" ("THESIS","KEYWORD") VALUES (8,'ARTIFICIAL INTELLIGENCE');
INSERT INTO "KEYWORD" ("THESIS","KEYWORD") VALUES (8,'EXPLAINABLE AI');


INSERT INTO "TYPE" ("THESIS","TYPE") VALUES (1,'EXPERIMENTAL');
INSERT INTO "TYPE" ("THESIS","TYPE") VALUES (2,'AZIENDALE');
INSERT INTO "TYPE" ("THESIS","TYPE") VALUES (2,'EXPERIMENTAL');
INSERT INTO "TYPE" ("THESIS","TYPE") VALUES (2,'RESEARCH');
INSERT INTO "TYPE" ("THESIS","TYPE") VALUES (2,'SPERIMENTALE APPLICATA');
INSERT INTO "TYPE" ("THESIS","TYPE") VALUES (2,'SPERIMENTALE IN AZIENDA');
INSERT INTO "TYPE" ("THESIS","TYPE") VALUES (3,'EXPERIMENTAL');
INSERT INTO "TYPE" ("THESIS","TYPE") VALUES (4,'EXPERIMENTAL');
INSERT INTO "TYPE" ("THESIS","TYPE") VALUES (5,'RESEARCH');
INSERT INTO "TYPE" ("THESIS","TYPE") VALUES (6,'ABROAD');
INSERT INTO "TYPE" ("THESIS","TYPE") VALUES  (6,'IN COMPANY');
INSERT INTO "TYPE" ("THESIS","TYPE") VALUES  (7,'ABROAD');
INSERT INTO "TYPE" ("THESIS","TYPE") VALUES  (7,'IN COMPANY');
INSERT INTO "TYPE" ("THESIS","TYPE") VALUES  (8,'ABROAD');

COMMIT;
