BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS "DEGREE" (
  	"COD_DEGREE" VARCHAR(25),
	"TITLE_DEGREE"	VARCHAR(25),
	PRIMARY KEY("COD_DEGREE")
);

CREATE TABLE IF NOT EXISTS "STUDENT" (
    "ID" VARCHAR(50),
	"NAME" VARCHAR(25),
  	"SURNAME" VARCHAR(25),
  	"GENDER" VARCHAR(25),
    "NATIONALITY" VARCHAR(25),
    "EMAIL" VARCHAR(50),
    "ENROLLMENT_YEAR" VARCHAR(25),
    "COD_DEGREE" INTEGER NOT NULL,
    FOREIGN KEY("COD_DEGREE") REFERENCES "DEGREE"("COD_GEDREE"),
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
  "TYPE" VARCHAR(25),
  FOREIGN key("DEGREE") REFERENCES "DEGREE"("COD_DEGREE"),
  FOREIGN key("SUPERVISOR") REFERENCES "TEACHER"("ID"),
  PRIMARY KEY("ID_THESIS" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "THESIS_PROPOSAL"(
  "STUDENT" VARCHAR(50),  
  "THESIS" INTEGER NOT NULL,
  "STATE" INTEGER NOT NULL, /**1 ACCETTATA - 0 NON ACCETTATA**/
  FOREIGN key("THESIS") REFERENCES "THESIS"("ID_THESIS"),
  FOREIGN key("STUDENT") REFERENCES "STUDENT"("ID"),
  PRIMARY KEY("STUDENT","THESIS")
);

CREATE TABLE IF NOT EXISTS "THESIS_STATUS"(
  "THESIS" INTEGER NOT NULL,
  "STATE" INTEGER NOT NULL, /**stato può assumere 3 valori --> 1: attiva - 0: archiviata**/
  FOREIGN key("THESIS") REFERENCES "TESI"("ID_THESIS"),
  PRIMARY KEY("THESIS")
);

CREATE TABLE IF NOT EXISTS "CO_SUPERVISORS"(
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

COMMIT;

/**TRACCIATO RECORD**/


/**
Scrivere gli inserimenti nel DB e caricarli su github. Dividere ogni blocco una tabella
**/


