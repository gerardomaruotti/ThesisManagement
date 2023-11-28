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
	PRIMARY KEY("ID"),
	FOREIGN KEY("COD_DEGREE") REFERENCES "DEGREE"("COD_DEGREE")
);
CREATE TABLE IF NOT EXISTS "TEACHER" (
	"ID"	VARCHAR(50),
	"NAME"	VARCHAR(25),
	"SURNAME"	VARCHAR(25),
	"EMAIL"	VARCHAR(50),
	"COD_GROUP"	VARCHAR(25),
	"COD_DEPARTMENT"	VARCHAR(25),
	PRIMARY KEY("ID"),
	FOREIGN KEY("COD_DEPARTMENT") REFERENCES "DEPARTMENT"("COD_DEPARTMENT"),
	FOREIGN KEY("COD_GROUP") REFERENCES "GROUP"("COD_GROUP")
);
CREATE TABLE IF NOT EXISTS "STUD_AUTH0" (
	"ID"	VARCHAR(50),
	"ID_AUTH0"	VARCHAR(50),
	PRIMARY KEY("ID"),
	FOREIGN KEY("ID") REFERENCES "STUDENT"("ID")
);
CREATE TABLE IF NOT EXISTS "TEACHER_AUTH0" (
	"ID"	VARCHAR(50),
	"ID_AUTH0"	VARCHAR(50),
	PRIMARY KEY("ID"),
	FOREIGN KEY("ID") REFERENCES "TEACHER"("ID")
);
CREATE TABLE IF NOT EXISTS "CAREER" (
	"ID"	VARCHAR(50),
	"COD_COURSE"	VARCHAR(25),
	"TITLE_COURSE"	VARCHAR(25),
	"CFU"	VARCHAR(25),
	"GRADE"	INTEGER,
	"DATE"	VARCHAR(25),
	PRIMARY KEY("ID","COD_COURSE"),
	FOREIGN KEY("ID") REFERENCES "STUDENT"("ID")
);
CREATE TABLE IF NOT EXISTS "THESIS" (
	"ID_THESIS"	INTEGER NOT NULL,
	"TITLE"	VARCHAR(25),
	"DESCRIPTION"	VARCHAR(500),
	"REQUIRED_KNOWLEDGE"	VARCHAR(100),
	"NOTES"	VARCHAR(500),
	"EXPIRATION_DATE"	VARCHAR(25),
	"LEVEL"	VARCHAR(25),
	"DEGREE"	VARCHAR(25),
	"SUPERVISOR"	VARCHAR(50),
	PRIMARY KEY("ID_THESIS" AUTOINCREMENT),
	FOREIGN KEY("DEGREE") REFERENCES "DEGREE"("COD_DEGREE"),
	FOREIGN KEY("SUPERVISOR") REFERENCES "TEACHER"("ID")
);
CREATE TABLE IF NOT EXISTS "THESIS_APPLICATION" (
	"ID_APPLICATION"	INTEGER NOT NULL,
	"STUDENT"	VARCHAR(50),
	"THESIS"	INTEGER NOT NULL,
	"STATE"	INTEGER NOT NULL,
	FOREIGN KEY("STUDENT") REFERENCES "STUDENT"("ID"),
	FOREIGN KEY("THESIS") REFERENCES "THESIS"("ID_THESIS"),
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
	"NAME"	VARCHAR(25),
	"SURNAME"	VARCHAR(25),
	"EMAIL"	VARCHAR(50),
	FOREIGN KEY("THESIS") REFERENCES "THESIS"("ID_THESIS"),
	PRIMARY KEY("THESIS","EMAIL")
);
CREATE TABLE IF NOT EXISTS "KEYWORD" (
	"THESIS"	INTEGER NOT NULL,
	"KEYWORD"	VARCHAR(25),
	FOREIGN KEY("THESIS") REFERENCES "THESIS"("ID_THESIS"),
	PRIMARY KEY("THESIS","KEYWORD")
);
CREATE TABLE IF NOT EXISTS "TYPE" (
	"THESIS"	INTEGER NOT NULL,
	"TYPE"	VARCHAR(25),
	FOREIGN KEY("THESIS") REFERENCES "THESIS"("ID_THESIS"),
	PRIMARY KEY("THESIS","TYPE")
);
CREATE TABLE IF NOT EXISTS "VIRTUAL_CLOCK" (
	"data"	VARCHAR(50)
);
INSERT INTO "DEGREE" ("COD_DEGREE","TITLE_DEGREE") VALUES ('LM-53','Laurea magistrale in Ingegneria Dei Materiali'),
 ('LM-29','Laurea magistrale in Ingegneria Elettronica'),
 ('LM-31','Laurea magistrale in Ingegneria Gestionale'),
 ('LM-33','Laurea magistrale in Ingegneria Meccanica'),
 ('LM-25','Laurea magistrale in Mechatronic Engineering'),
 ('LM-32','Laurea magistrale in Ingegneria Infortmatica'),
 ('LM-20','Laurea magistrale in Ingegneria Aerospaziale'),
 ('LM-21','Laurea magistrale in Ingegneria Biomedica'),
 ('L-8','Laurea in Ingegneria Informatica'),
 ('L-9','Laurea in Ingegneria Chimica');
INSERT INTO "GROUP" ("COD_GROUP","NAME") VALUES ('GR-16','Software Engineering Group'),
 ('GR-05','Electronic Cad and Reliabilty Check'),
 ('GR-13','Metodi Formali'),
 ('GR-04','Database and Data Mining Group'),
 ('GR-10','Intelligent and Interactive System Group'),
 ('AA-01','Glasses, Ceramics and Composites'),
 ('AA-02','Propulsione Aerospaziale'),
 ('RESLOG','Research and Innovation in Logistics & Project Management');
INSERT INTO "DEPARTMENT" ("COD_DEPARTMENT","NAME") VALUES ('DAUIN','Dipartimento di Automatica e Informatica'),
 ('DIMEAS','Dipartimento di Ingegneria Meccanica e Aerospaziale'),
 ('DET','Dipartimento di Elettronica e Telecomunicazioni'),
 ('DISAT','Dipartimento Scienza Applicata e Tecnologia'),
 ('DIGEP','Dipartimento di Ingegneria Gestionale e della Produzione');
INSERT INTO "STUDENT" ("ID","NAME","SURNAME","GENDER","NATIONALITY","EMAIL","ENROLLMENT_YEAR","COD_DEGREE") VALUES ('s319852','Evelina Marija','Bratuhina','F','Lettone','s319852@studenti.polito.it','2022','LM-32'),
 ('s313373','Fabio','Mangani','M','Italiana','s313373@studenti.polito.it','2022','LM-32'),
 ('s319854','Riccardo','Simeone','M','Italiana','s319854@studenti.polito.it','2022','LM-32'),
 ('s317977','Giacomo','Cauda','M','Italiana','s317977@studenti.polito.it','2022','LM-29'),
 ('s317642','Gerardo','Maruotti','M','Italiana','s317642@studenti.polito.it','2022','LM-20'),
 ('s317611','Edoardo','Morello','M','Italiana','s317611@studenti.polito.it','2022','LM-53'),
 ('s315327','Davide','Vilella','M','Italiana','s315327@studenti.polito.it','2022','LM-31'),
 ('s318927','Andrea','Scamporrino','M','Italiana','s318927@studenti.polito.it','2022','LM-33');
INSERT INTO "TEACHER" ("ID","NAME","SURNAME","EMAIL","COD_GROUP","COD_DEPARTMENT") VALUES ('d123456','Marco','Torchiano','d123456@polito.it','GR-16','DAUIN'),
 ('d123457','Anna Filomena','Carbone','d123457@polito.it','GR-05','DISAT'),
 ('d123458','Lorenzo','Casalino','d123458@polito.it','AA-02','DIMEAS'),
 ('d123459','Silvia','Chiusano','d123459@polito.it','GR-04','DAUIN'),
 ('d111111','Marco','Sangermano','d111111@polito.it','AA-01','DISAT'),
 ('d123461','Carlo','Rafele','d123461@polito.it','RESLOG','DIGEP'),
 ('d123462','Fulvio','Corno','d123462@polito.it','GR-10','DAUIN'),
 ('d123463','Antonio','Vetrò','d123463@polito.it','GR-16','DAUIN');
INSERT INTO "STUD_AUTH0" ("ID","ID_AUTH0") VALUES ('s313373','auth0|654caa9c50ddd0e01984fe64'),
 ('s317977','auth0|655f9462022f6b2083b35623'),
 ('s319852','auth0|6552613d2d58c43c6805bc5a'),
 ('s319854','auth0|655f94e1022f6b2083b356ac'),
 ('s315327','auth0|655f9507022f6b2083b356d0'),
 ('s317611','auth0|6552618d2d58c43c6805bc74'),
 ('s318927','auth0|654caac150ddd0e01984fe84'),
 ('s317642','auth0|654ca958501d0a3a0de1ab4c');
INSERT INTO "TEACHER_AUTH0" ("ID","ID_AUTH0") VALUES ('d123456','auth0|654f41a17a8e265bbdac8830'),
 ('d111111','auth0|655262d32d58c43c6805bd0b'),
 ('d123457','auth0|655f955aed81aad0fed3de7c'),
 ('d123458','auth0|655f957fed81aad0fed3dea4'),
 ('d123459','auth0|655f95a4ed81aad0fed3dec6'),
 ('d123461','auth0|655f95c1ed81aad0fed3deed'),
 ('d123462','auth0|655f95ee022f6b2083b357da'),
 ('d123463','auth0|655f960ced81aad0fed3df3c');
INSERT INTO "CAREER" ("ID","COD_COURSE","TITLE_COURSE","CFU","GRADE","DATE") VALUES ('s319852','02GRSOV','Programmazione di sistema','10',27,'2023-09-04'),
 ('s319852','01SQMOV','Data Science E Tecnologie Per Le Basi Di Dati','8',29,'2023-02-21'),
 ('s319852','02KPNOV','Tecnologie e servizi di rete','6',24,'2023-09-06'),
 ('s313373','01UDFOV','Applicazioni Web I','6',24,'2023-06-26'),
 ('s313373','01SQJOV','Data Science and Database Technology','8',26,'2023-01-23'),
 ('s313373','04GSPOV','Software engineering','8',25,'2023-06-28'),
 ('s317977','05BVCOQ','Optoelettronica','6',26,'2023-01-21'),
 ('s317977','02MXBOQ','Passive Optical Components','8',25,'2023-07-05'),
 ('s317642','02BAQMT','Gasdinamica','8',29,'2023-02-02'),
 ('s317642','03GKZMT','Sistemi aerospaziali','8',28,'2023-06-30'),
 ('s317611','20AXPLS','Fisica II','6',20,'2023-02-12'),
 ('s317611','02CFTLS','Scienza e tecnologia dei materiali ceramici','8',30,'2023-07-07');
INSERT INTO "THESIS" ("ID_THESIS","TITLE","DESCRIPTION","REQUIRED_KNOWLEDGE","NOTES","EXPIRATION_DATE","LEVEL","DEGREE","SUPERVISOR") VALUES (1,'Incrementare la sicurezza di una smart home tramite smart home gateway e MUD','Le smart home sono abitazioni in grado di gestire una varietà di sistemi domotici come illuminazione, elettrodomestici, finestre, termovalvole, videosorveglianza e molti altri. L''interazione con le smart home è spesso programmabile e possibile anche da remoto. Recenti studi dimostrano come questo tipo di abitazioni, sempre più diffuso, presenti spesso problemi di sicurezza informatica.','Linguaggio di programmazione della piattaforma: Python; Programmazione orientata agli oggetti','','2023-12-14','MSc','LM-32','d123462'),
 (2,'Data-centric AI: Dataset augmentation techniques for bias and data quality improvement','Clearbox AI Control Room has a feature to generate synthetic datasets for dataset augmentation. The thesis work is focused in the experimentation of techniques that can help detect bias in the original datasets and mitigate them by augmenting the original dataset using synthetic points. The project will require identifying the types of bias within a dataset and identifying intervention mechanisms to remove the bias using synthetic data generation methods. Clearbox AI is an innovative SME, incubated in I3P, winner of the National Innovation Award (PNI 2019) in the ICT category and the EU Seal of Excellence awarded by the European Commission. Clearbox AI is developing a unique and innovative technology (''AI Control Room''), which allows to put into production artificial intelligence models that are robust, explainable and monitorable over time.','Good programming skills and basic knowledge of common data analytics tools and techniques. Grade point average equal to or higher than 26 will play a relevant role in the selection.','When sending your application, we kindly ask you to attach the following information:

- list of exams taken in you master degree, with grades and grade point average

- a résumé or equivalent (e.g., linkedin profile), if you already have one

- by when you aim to graduate and an estimate of the time you can devote to the thesis in a typical week','2023-11-30','MSc','LM-32','d123456'),
 (3,'Stampa 3D di resine da fonti biorinnovabili','Si studieranno formulazioni da fonti bio-rinnovabili fotoreticolabili per la stampa 3D','','','2024-03-30','MSc','LM-53','d111111'),
 (4,'Real Time simulation environment developed with rapid prototyping tool (dSpace system)','Emergent has extensive experience in development and support of distributed real-time closed-loop hardware-in-the-loop multi-spacecraft simulations. It is required to provide ongoing end-to-end engineering support for systems that enable simulations of spacecraft onboard systems and vehicle orbit and attitude dynamics to help facilitate mission formulation, design, analysis, and hardware trade studies.','Programming Languages: C/C++, Matlab SimuLink','The thesis will be developed at Thales AleniaSpace Spa (Turin). After thesis work, Thales AleniaSpace Spa offers an internship opportunity as full-time position for six months.','2012-12-31','MSc','LM-20','d123458'),
 (5,'Statistical modeling of genomic sequences','The information content of a genomic sequence can be measured using various information-theoretic measures, such as entropy, mutual information, and compression complexity. For example, the entropy measures the uncertainty or randomness of the sequence, with higher entropy indicating more randomness and lower entropy indicating more predictability. Mutual information can be used to quantify the dependence between different regions of the genome. Compression complexity quantifies the shortest possible description length of the sequence.','programming, probability theory, statistical inference','','2024-03-28','MSc','LM-29','d123457'),
 (6,'Exploring the Impact of Technological Integration on Educational Outcomes in Middle Schools','The thesis proposal will involve a comprehensive literature review to provide a theoretical background on technology integration in education, Research methodology will include a mixed methods approach, combining both quantitative and qualitative data collection methods, Data collection may involve conducting surveys and interviews with middle school teachers, students, and administrators, as well as analyzing academic performance data, The proposal will address ethical considerations in research, such as obtaining informed consent and ensuring participant confidentiality, Time management and organization skills will be necessary to ensure completion of the study within the proposed timeframe, Collaboration and communication with middle school stakeholders will be crucial for obtaining necessary permissions and support for the research, The proposal will include a detailed plan for analysis and interpretation of data, as well as recommendations for educational practices and policy implications.','Familiarity with educational theories and pedagogical approaches, Understanding of technology integration and its potential impact on classroom dynamics, Basic knowledge of research methods and data analysis.
','This thesis proposal aims to investigate the influence of technology integration on educational outcomes in middle schools. It seeks to explore whether the integration of technology in teaching and learning practices enhances student engagement, academic performance, and motivation. Additionally, it aims to identify the barriers and challenges that educators face in effectively implementing technology in the classroom.
','2024-08-16','MSc','LM-29','d111111'),
 (7,'Optimizing Energy Efficiency in Industrial Processes using Machine Learning Techniques','This thesis aims to explore the application of machine learning algorithms in optimizing energy efficiency in industrial processes. Industrial processes consume a significant amount of energy, and improving their efficiency can have substantial environmental and economic benefits. By leveraging collected data from sensors and other sources, machine learning algorithms identify patterns and develop models to predict energy consumption, optimize process parameters, and recommend energy-saving measures. This research will analyze different machine learning techniques such as regression, classification, and clustering algorithms to identify the most effective approach for optimizing energy efficiency in diverse industrial processes.','Strong understanding of engineering principles, particularly in the fields of energy systems, process optimization, and industrial automation. Familiarity with machine learning algorithms and techniques, including regression, classification, and clustering. Proficiency in programming languages commonly used in machine learning, such as Python or R. Knowledge of data preprocessing techniques, feature engineering, and model evaluation methods. Ability to work with large datasets and implement machine learning algorithms using appropriate libraries or frameworks. Familiarity with industrial processes and energy management practices would be beneficial.','The thesis will investigate the feasibility and effectiveness of using machine learning algorithms in optimizing energy efficiency in various industrial settings, including manufacturing, chemical plants, and power generation. Data preprocessing techniques will be explored for cleaning, transforming, and analyzing the data collected from sensors and other sources. The selected machine learning algorithms will be implemented and tested on real-world industrial datasets to evaluate their performance and accuracy in predicting energy consumption and optimizing process parameters. The thesis will also investigate challenges and limitations associated with implementing machine learning techniques in industrial environments, such as data quality, model interpretability, and deployment considerations. The findings of this research will provide key insights into the practical implementation of machine learning techniques to improve energy efficiency in industrial processes, contributing to sustainable development and cost savings.
','2024-07-24','MSc','LM-32','d111111'),
 (8,'ARMADA: A Framework for Automatic Hardware Design Debugging and Repair','In recent years, there has been an exponential growth in the size and complexity of System-on-Chip (SoC) designs targeting different specialized applications. The cost of an undetected bug in these systems is much higher than in traditional processor systems, as it may imply the loss of property or life. The problem is further exacerbated by the ever-shrinking time-to-market and ever-increasing design complexity and demand to churn out billions of hardware devices. Despite decades of research in simulation and formal methods for debugging and verifying pre-silicon register transfer level (RTL) design, RTL debugging is still one of the most time-consuming and resource-intensive processes in the contemporary hardware design cycle. Current industrial practice primarily uses regression techniques and what-if analysis for debugging. However, such methods are extremely time-consuming and often rely on deep insights from human experts. On the other hand, academic researchers have proposed automated debugging techniques using data-driven statistical analysis, SAT, and BDD. However, such methods often suffer from scalability issues, do not provide human-comprehensible explanations of failure root causes, and do not automatically create code patches to fix buggy designs. This project will address this critical problem by creating ARMADA, a new foundational infrastructure, and a comprehensive tool suite for pre-silicon RTL debugging. A critical insight is that recent advances in state-of-the-art deep learning models, such as Transformer, Large Language Models (LLMs), have enormous potential to root cause and localize, explain root causes that are human understandable, and generate code patches to debug the RTL designs. We propose integrating this insight in ARMADA to create a novel, scalable, and effective pre-silicon debugging and repairing framework.

Intellectual Merit
The project will develop a unified foundational infrastructure and comprehensive suite of tools to enable streamlined pre-silicon RTL debugging and repairing of realistic SoCs.
(1) It will develop novel technologies for characterizing and classifying design failure traces for effective debugging and root cause analysis.
(2) It will create a framework for automatically localizing suspicious design components and design source codes.
(3) It will develop a framework to generate human-understandable explanations of design failures at different abstractions in natural language.
(4) It will develop novel technologies to automatically generate fixes, i.e., code patches to repair suspicious design components. The proposed approaches will be demonstrated on complex, realistic, industry-scale SoC designs.','Advanced programming skills, basics of data analytics, computer architectures, testing and verification of hardware devices.','The thesis is expected to be carried out under the tutelage of Prof. Debjit Pal at the University of Illinois at Chicago. Visa paperwork will be handled by the University of Chicago offices. All other expenses will be borne by the student. In case of particular impediments, the thesis can be developed at Politecnico.','2023-11-18','MSc','LM-29','d111111'),
 (9,'Artificial Intelligence in Aeronautics: a state-of-the-art','Artificial Intelligence (AI) is shaping the world we live in, providing new insights and offering unthinkable opportunities in every scope of engineering. This is true for the aviation industry as well as the most important industries in the field are looking at AI (and its explainable versions) with an interested eye. While AI offers immense potential for innovation, there are still technical challenges and concerns surrounding safety that need to be addressed. This thesis should approach and provide a bird eye perspective on where AI is currently used in the aerospace domain as well as the possible challenges and opportunities it may bring to the aerospace world.','Basic understanding of AI principles and aerospace','','2024-10-31','MSc','LM-20','d111111'),
 (10,'Digital Twins in the Aviation Sector: Assessing the Gap Between Theory and Reality','Digital twins (DTs) are virtual replicas of real-world objects or systems that span their lifecycle, are updated from real-time data, and use simulation, machine learning, and reasoning to aid decision-making. They are highly complex virtual models that accurately represent physical entities. The market for digital twins is expected to grow significantly across various industries. While digital twins have already made substantial progress in several sectors, there is still room for further advancements. On top of that, there is much confusion about what a DT is and what is not. Nevertheless, there is a lot of work still left to do and a systematic review which assesses the state-of-the-art and how far we have gone could be beneficial for both the academia and the industries.','Basic understanding of aerospace systems','Interest in the aerospace world and computational topics','2024-10-31','MSc','LM-20','d111111');
INSERT INTO "THESIS_APPLICATION" ("ID_APPLICATION","STUDENT","THESIS","STATE") VALUES (1,'s313373',2,0),
 (2,'s317611',3,1),
 (3,'s317977',6,2),
 (4,'s317977',5,2),
 (5,'s319852',7,0),
 (6,'s313373',7,0),
 (7,'s317642',9,2),
 (8,'s317642',9,1);
INSERT INTO "THESIS_STATUS" ("THESIS","STATE") VALUES (1,1),
 (2,1),
 (3,0),
 (4,0),
 (5,1),
 (6,1),
 (7,1),
 (8,1),
 (9,0),
 (10,1);
INSERT INTO "CO_SUPERVISOR" ("THESIS","NAME","SURNAME","EMAIL") VALUES (2,'Antonio','Vetrò','d123463@polito.it'),
 (5,'Lorenzo',' Casalino','d123458@polito.it'),
 (6,'Marco','Torchiano','d123456@polito.it'),
 (6,'Anna Filomena','Carbone','d123457@polito.it'),
 (7,'Antonio','Vetrò','d123463@polito.it'),
 (7,'Carlo','Rafele','d123461@polito.it'),
 (7,'Fulvio','Corno','d123462@polito.it'),
 (8,'Marco','Torchiano','d123456@polito.it'),
 (9,'Fulvio','Corno','d123462@polito.it'),
 (9,'Carlo','Rafele','d123461@polito.it'),
 (9,'Lorenzo','Casalino','d123458@polito.it');
INSERT INTO "KEYWORD" ("THESIS","KEYWORD") VALUES (1,'CYBERSECURITY'),
 (1,'SMART HOME'),
 (1,'SECURITY'),
 (1,'MUD'),
 (1,'INTERNET OF THINGS'),
 (2,'ALGORITHM FAIRNESS'),
 (2,'ARTIFICIAL INTELLIGENCE'),
 (2,'DATA ETHICS'),
 (2,'DATA QUALITY'),
 (2,'DATA SCIENCE'),
 (2,'EXPLAINABLE AI'),
 (2,'HUMAN-COMPUTER INTERACTION'),
 (2,'SYNTHETIC DATA'),
 (2,'SOFTWARE ENGINEERING'),
 (3,'3-D PRINTING'),
 (3,'FOTOPOLIMERIZZAZIONE'),
 (4,'AEROSPACE'),
 (4,'DIGITAL SYSTEM DESIGN TEST AND VERIFICATION'),
 (4,'DSPACE ENVIRONMENT, PROTOTYPING TOOL'),
 (4,'REAL TIME SIMULATION, SIMULINK'),
 (4,'THALES-ALENIA SPACE'),
 (5,'BIOINFORMATICS'),
 (5,'COMPUTATIONAL BIOLOGY'),
 (6,'CYBERSECURITY'),
 (6,'ARTIFICIAL INTELLIGENCE'),
 (7,'ARTIFICIAL INTELLIGENCE'),
 (7,'MACHINE LEARNING'),
 (8,'CYBERSECURITY'),
 (8,'INTERNET OF THINGS'),
 (8,'MUD'),
 (8,'DATA ETHICS'),
 (8,'DATA QUALITY'),
 (8,'ARTIFICIAL INTELLIGENCE'),
 (8,'EXPLAINABLE AI'),
 (9,'AEROSPACE'),
 (9,'ARTIFICIAL INTELLIGENCE'),
 (9,'REVIEW'),
 (10,'AEROSPACE'),
 (10,'COMPUTATIONAL MODELING'),
 (10,'COMPUTATIONAL TOPOLOGY'),
 (10,'ALGORITHMS DEVELOPMENT'),
 (10,'DIGITAL TWIN'),
 (10,'REVIEW');
INSERT INTO "TYPE" ("THESIS","TYPE") VALUES (1,'EXPERIMENTAL'),
 (2,'AZIENDALE'),
 (2,'EXPERIMENTAL'),
 (2,'RESEARCH'),
 (2,'SPERIMENTALE APPLICATA'),
 (2,'SPERIMENTALE IN AZIENDA'),
 (3,'EXPERIMENTAL'),
 (4,'EXPERIMENTAL'),
 (5,'RESEARCH'),
 (6,'ABROAD'),
 (6,'IN COMPANY'),
 (7,'ABROAD'),
 (7,'IN COMPANY'),
 (8,'ABROAD'),
 (9,'REVIEW'),
 (10,'REVIEW'),
 (10,'REVIEW OF ARTICLES');
INSERT INTO "VIRTUAL_CLOCK" ("data") VALUES (NULL);
COMMIT;
