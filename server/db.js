'use strict';

const sqlite = require('sqlite3');
const crypto = require('crypto');
const { Console } = require('console');


let db = new sqlite.Database('thesis_management.db', (err) => {
  if (err) throw err;
});

exports.init = (database) => {
  db = database;
}

exports.getKeywords = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT DISTINCT keyword FROM KEYWORD';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      }
      else {
        let keywords = [];
        rows.forEach((elem) => (
          keywords.push(elem.KEYWORD)
        ));
        resolve(keywords);
      }
    });
  });
};

exports.getKeywordsbyId = (idThesis) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT keyword FROM KEYWORD WHERE THESIS=?';
    db.all(sql, [idThesis], (err, rows) => {
      if (err) {
        reject(err);
      }
      else {
        let keywords = [];
        rows.forEach((elem) => (
          keywords.push(elem.KEYWORD)
        ));
        resolve(keywords);
      }
    });
  });
};


exports.getTypes = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT DISTINCT type FROM TYPE';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      }
      else {
        let types = [];
        rows.forEach((elem) =>
          types.push(elem.TYPE)
        )
        resolve(types)
      }
    });
  });
};

exports.getTypesbyId = (idThesis) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT type FROM TYPE WHERE THESIS=?';
    db.all(sql, [idThesis], (err, rows) => {
      if (err) {
        reject(err);
      }
      else {
        let types = [];
        rows.forEach((elem) =>
          types.push(elem.TYPE)
        )
        resolve(types)
      }
    });
  });
};

exports.getTeachers = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT ID,NAME,SURNAME, EMAIL FROM TEACHER';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      }
      else {
        const teachers = rows.map((elem) => ({
          ID: elem.ID,
          name: elem.NAME,
          surname: elem.SURNAME,
          email: elem.EMAIL
        }));

        resolve(teachers)
      }
    });
  });
};

exports.getTeacher = (codSupervisor) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT NAME,SURNAME FROM TEACHER WHERE ID=?';
    db.get(sql, [codSupervisor], (err, row) => {
      if (err) {
        reject(err);
      }
      else {
        let teacher = {
          name: row.NAME,
          surname: row.SURNAME
        };

        resolve(teacher)
      }
    });
  });
};

exports.getCoSupervisors = (idThesis) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT NAME, SURNAME, EMAIL FROM CO_SUPERVISOR WHERE THESIS=?';
    db.all(sql, [idThesis], (err, rows) => {
      if (err) {
        reject(err);
      }
      else {
        const coSupervisors = rows.map((elem) => ({
          name: elem.NAME,
          surname: elem.SURNAME,
          email: elem.EMAIL
        }));

        resolve(coSupervisors)
      }
    });
  });
};

exports.getCoSupervisorsEmail = (idThesis) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT EMAIL FROM CO_SUPERVISOR WHERE THESIS=?';
    db.all(sql, [idThesis], (err, rows) => {
      if (err) {
        reject(err);
      }
      else {
        let coSupervisors = [];
        rows.forEach((elem) => (
          coSupervisors.push(elem.EMAIL)
        ));

        resolve(coSupervisors)
      }
    });
  });
};

exports.getCdS = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM DEGREE';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      }
      else {
        const cds = rows.map((elem) => ({
          cod_degree: elem.COD_DEGREE,
          title_degree: elem.TITLE_DEGREE
        }))
        resolve(cds)
      }
    });
  });
};

exports.getThesisExpDate = (ID) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT EXPIRATION_DATE FROM THESIS WHERE ID_THESIS=? ';
    db.get(sql, [ID], (err, row) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(row.EXPIRATION_DATE)
      }
    });
  });
};

exports.getGroups = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM "GROUP" ';
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        const groups = rows.map((elem) => ({
          cod_group: elem.COD_GROUP,
          name: elem.NAME,
        }));
        resolve(groups);
      }
    });
  });
};

exports.getThesisSupervisor = (ID) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT SUPERVISOR FROM THESIS WHERE ID_THESIS=? ';
    db.get(sql, [ID], (err, row) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(row.SUPERVISOR)
      }
    });
  });
};

exports.getTitleDegree = (codDegree) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT TITLE_DEGREE FROM DEGREE WHERE COD_DEGREE=?';
    db.get(sql, [codDegree], (err, row) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(row.TITLE_DEGREE)
      }
    });
  });
}

exports.getGroupSupervisorAndCoSupervisor = (idThesis) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT G.name as group_name, g.cod_group as cod_group FROM TEACHER TE JOIN CO_SUPERVISOR CS ON TE.EMAIL = CS.email join "GROUP" G ON G.cod_group = TE.cod_group WHERE  CS.THESIS=? UNION SELECT  G.name as group_name, g.cod_group as cod_group FROM TEACHER TE JOIN THESIS T ON T.SUPERVISOR = TE.ID join "GROUP" G ON G.cod_group = TE.cod_group WHERE T.id_thesis=?';
    db.all(sql, [idThesis, idThesis], (err, rows) => {
      if (err) {
        reject(err);
      }
      else {
        const groups = rows.map((elem) => ({
          cod_group: elem.cod_group,
          group_name: elem.group_name,
        }))
        resolve(groups)
      }
    });
  });
};

exports.getGroup = (idThesis) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT G.cod_group as cod_group FROM TEACHER TE JOIN CO_SUPERVISOR CS ON TE.EMAIL = CS.email join "GROUP" G ON G.cod_group = TE.cod_group WHERE  CS.THESIS=? UNION SELECT  G.cod_group as cod_group FROM TEACHER TE JOIN THESIS T ON T.SUPERVISOR = TE.ID join "GROUP" G ON G.cod_group = TE.cod_group WHERE T.id_thesis=?';
    db.all(sql, [idThesis, idThesis], (err, rows) => {
      if (err) {
        reject(err);
      }
      else {
        let groups = [];
        rows.forEach((elem) => (
          groups.push(elem.cod_group)
        ))
        resolve(groups)
      }
    });
  });
};

exports.getRole = (auth0) => {
  return new Promise((resolve, reject) => {
    const findStudentQuery = 'SELECT S.ID AS ID, S.NAME AS NAME, S.SURNAME AS SURNAME, S.EMAIL AS EMAIL FROM STUD_AUTH0 SA JOIN STUDENT S ON S.ID == SA.ID  WHERE ID_AUTH0=? ';
    const findTeacherQuery = 'SELECT T.ID AS ID, T.NAME AS NAME, T.SURNAME AS SURNAME, T.EMAIL AS EMAIL FROM TEACHER T JOIN TEACHER_AUTH0 TA ON T.ID == TA.ID WHERE ID_AUTH0=? ';
    const findSecretaryQuery = 'SELECT S.ID AS ID, S.NAME AS NAME, S.SURNAME AS SURNAME, S.EMAIL AS EMAIL FROM SECRETARY_CLERK S JOIN SECRETARY_AUTH0 SA ON S.ID == SA.ID WHERE ID_AUTH0=? ';

    const handleStudentQueryResult = (err, elem) => {
      if (err) {
        reject(err);
      } else {
        if (elem !== undefined) {
          resolve({
            "role": "student",
            "id": elem.ID,
            "name": elem.NAME,
            "surname": elem.SURNAME,
            "email": elem.EMAIL
          });
        } else {
          findTeacher(); // If not a student, check if it's a teacher
        }
      }
    };

    const handleTeacherQueryResult = (err, elem) => {
      if (err) {
        reject(err);
      } else {
        if (elem !== undefined) {
          resolve({
            "role": "teacher",
            "id": elem.ID,
            "name": elem.NAME,
            "surname": elem.SURNAME,
            "email": elem.EMAIL
          });
        } else {
          findSecretary(); // Neither student nor teacher found
        }
      }
    };

    const handleSecretaryQueryResult = (err, elem) => {
      if (err) {
        reject(err);
      } else {
        if (elem !== undefined) {
          resolve({
            "role": "secretary",
            "id": elem.ID,
            "name": elem.NAME,
            "surname": elem.SURNAME,
            "email": elem.EMAIL
          });
        } else {
          resolve({}); // Neither student nor teacher found
        }
      }
    };


    const findStudent = () => {
      db.get(findStudentQuery, [auth0.payload.sub], (err, elem) => {
        handleStudentQueryResult(err, elem);
      });
    };

    const findTeacher = () => {
      db.get(findTeacherQuery, [auth0.payload.sub], (err, elem) => {
        handleTeacherQueryResult(err, elem);
      });
    };

    const findSecretary = () => {
      db.get(findSecretaryQuery, [auth0.payload.sub], (err, elem) => {
        handleSecretaryQueryResult(err, elem);
      });
    };


    // Main logic
    findStudent();
  });
};
exports.getThesisTeacher = (ID, date) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT DISTINCT T.ID_THESIS as ID, TS.STATE AS status,  T.TITLE AS title, T.NOTES as notes, T.EXPIRATION_DATE AS date, T.DESCRIPTION AS description , T.REQUIRED_KNOWLEDGE AS req_know, TE.NAME AS sup_name, TE.SURNAME AS sup_surname FROM THESIS T JOIN TEACHER TE ON T.SUPERVISOR == TE.ID JOIN THESIS_STATUS TS ON TS.THESIS == T.ID_THESIS WHERE TE.ID = ? ';
    db.all(sql, [ID], (err, rows) => {
      if (err) {
        reject(err);
      }

      if (rows.length == 0){
          resolve([])
      } else{

          const thesis = rows.map((elem) => ({
            ID: elem.ID,
            title: elem.title,
            description: elem.description,
            req_know: elem.req_know,
            sup_name: elem.sup_name,
            sup_surname: elem.sup_surname,
            notes: elem.notes,
            status : ((date==0) ? elem.status : ((date > elem.date && elem.status == 1) ? 0 : elem.status)),
            count: 0,
            keywords: [],
            types: [], 
            applications: 0
          }))
          resolve(thesis)
      }
    });
  })
}

exports.getThesisStudent = (ID, curDate) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT DISTINCT T.ID_THESIS as ID, T.TITLE AS title, T.NOTES as notes, T.DESCRIPTION AS description , T.REQUIRED_KNOWLEDGE AS req_know, TE.NAME AS sup_name, TE.SURNAME AS sup_surname FROM THESIS T JOIN STUDENT S ON S.COD_DEGREE == T.DEGREE JOIN TEACHER TE ON T.SUPERVISOR == TE.ID JOIN THESIS_STATUS TS ON TS.THESIS == T.ID_THESIS WHERE S.ID = ? AND TS.STATE == 1 AND date(EXPIRATION_DATE) >= date(?) ';
    db.all(sql, [ID,curDate], (err, rows) => {
      if (err) {
        reject(err);
      }
      else {
        if (rows.length > 0) {
          const thesis = rows.map((elem) => ({
            ID: elem.ID,
            title: elem.title,
            description: elem.description,
            req_know: elem.req_know,
            sup_name: elem.sup_name,
            sup_surname: elem.sup_surname,
            notes: elem.notes,
            count: 0,
            keywords: [],
            types: [], 
          }))

          resolve(thesis)
        } else {
          resolve([])
        }
      }
    });
  });
}


exports.insertThesis = (title, description, req_know, notes, exp_date, level, degree, supervisor) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO thesis (title, description, required_knowledge, notes, expiration_date, level, degree, supervisor) VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
    db.run(sql, [title, description, req_know, notes, exp_date, level, degree, supervisor], function (err) {
      if (err) {
        reject(err);
      }
      resolve(this.lastID);
    });
  });
};

exports.insertCoSupervisor = (id, name, surname, email) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO co_supervisor (thesis, name, surname, email) VALUES(?, ?, ?, ?)';
    db.run(sql, [id, name, surname, email], function (err) {
      if (err) {
        reject(err);
      }
      resolve(this.lastID);
    });
  });
};

exports.insertKeyword = (id, keyword) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO keyword (thesis, keyword) VALUES(?, ?)';
    db.run(sql, [id, keyword], function (err) {
      if (err) {
        reject(err);
      }
      resolve(this.lastID);
    });
  });
};

exports.insertThesisStatus = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO THESIS_STATUS (thesis, state) VALUES(?, ?)';
    db.run(sql, [id, 1], function (err) {
      if (err) {
        reject(err);
      }
      resolve(this.lastID);
    });
  });
}

exports.insertType = (id, type) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO TYPE (thesis, type) VALUES(?, ?)';
    db.run(sql, [id, type], function (err) {
      if (err) {
        reject(err);
      }
      resolve(this.lastID);
    });
  });
}



exports.getThesis = (idThesis) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM THESIS WHERE id_thesis=?';
    db.get(sql, [idThesis], (err, row) => {
      if (err) {
        reject(err);
      }
      if (row == undefined) {
        reject(new Error('Thesis not found.'));
      } else {
        let thesis = {
          title: row.TITLE,
          description: row.DESCRIPTION,
          requiredKnowledge: row.REQUIRED_KNOWLEDGE,
          notes: row.NOTES,
          expirationDate: row.EXPIRATION_DATE,
          level: row.LEVEL,
          cds: row.DEGREE,
          supervisor: row.SUPERVISOR,
        };
        resolve(thesis);
      }
    });
  });
};

exports.checkThesisActive = (idThesis,date) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT STATE,EXPIRATION_DATE FROM THESIS_STATUS TS, THESIS T WHERE TS.THESIS=T.ID_THESIS AND T.ID_THESIS=?';
    db.get(sql, [idThesis], (err, row) => {
      if (err) {
        reject(err);
      }
      if (row == undefined) {
        reject(new Error('Thesis not found.'));
      } else {
        resolve((date == 0) ? row.STATE : (date > row.EXPIRATION_DATE && row.state == 1) ? 0 : row.STATE);
      }
    });
  });
};


exports.insertApplication = (userId, idThesis, date) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO THESIS_APPLICATION (student, thesis, state, application_date) VALUES(?, ?, ?, ?)';
    db.run(sql, [userId, idThesis, 0, date], function (err) {
      if (err) {
        reject(err);
      }
      resolve(this.lastID);
    });
  });
}

exports.getTeacherApplications = (teacherId,date) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT ID_THESIS, ID_APPLICATION, TITLE,EXPIRATION_DATE,LEVEL, DEGREE, STUDENT, S.NAME as NAME, S.SURNAME as SURNAME, S.EMAIL as EMAIL, TA.STATE AS STATE, TS.STATE AS TSTATE FROM THESIS T, TEACHER TE, THESIS_APPLICATION TA, THESIS_STATUS TS, STUDENT S WHERE T.SUPERVISOR=TE.ID AND T.ID_THESIS=TA.THESIS AND TA.STUDENT=S.ID AND T.ID_THESIS=TS.THESIS AND TE.ID=?';
    db.all(sql, [teacherId], (err,rows) => {
      if (err) {
        reject(err);
      } else{
        const applications=rows.map((elem)=>({
          id: elem.ID_THESIS,
          id_application: elem.ID_APPLICATION,
          t_state: elem.TSTATE,
          title: elem.TITLE,
          expirationDate: elem.EXPIRATION_DATE,
          level: elem.LEVEL,
          degree: elem.DEGREE,
          student: elem.STUDENT,
          name: elem.NAME,
          surname: elem.SURNAME,
          email: elem.EMAIL,
          state: ((date == 0) ? elem.STATE : (date > elem.EXPIRATION_DATE && elem.STATE == 0) ? 3 : elem.STATE),
        }));

        resolve(applications)
      }
      
    });
  });
}


exports.getStudentApplications = (studentId,date) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT ID_THESIS,TITLE,EXPIRATION_DATE,LEVEL, DEGREE, SUPERVISOR, TE.NAME as NAME, TE.SURNAME as SURNAME, STATE FROM THESIS T, STUDENT S, THESIS_APPLICATION TA, TEACHER TE WHERE TA.STUDENT=S.ID AND T.ID_THESIS=TA.THESIS AND T.SUPERVISOR = TE.ID AND S.ID=?';
    db.all(sql, [studentId], (err,rows) => {
      if (err) {
        reject(err);
      } else{
        const applications=rows.map((elem)=>({
          id: elem.ID_THESIS,
          title: elem.TITLE,
          expirationDate: elem.EXPIRATION_DATE,
          level: elem.LEVEL,
          degree: elem.DEGREE,
          supervisor: elem.SUPERVISOR,
          name: elem.NAME,
          surname: elem.SURNAME,
          state: ((date == 0) ? elem.STATE : (date > elem.EXPIRATION_DATE && elem.STATE == 0) ? 3 : elem.STATE),
          keywords: [],
          types: []
        }));

        resolve(applications)
      }
      
    });
  });
}


exports.checkExistenceApplication= (thesis, student)=> {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM THESIS_APPLICATION WHERE STUDENT = ? AND THESIS = ? AND STATE == 0';
    db.get(sql, [student, thesis], (err, row) => {
      if (err) {
        reject(err);
      }
      else {
        if (row == undefined)
          resolve({"available":0, data:""})
        else{
          let application = {
            student: row.STUDENT,
            thesis: row.THESIS,
            state : row.STATE
          };
          resolve({"available":1, data:application})
        }
      }
    });
  });
}


exports.checkExistenceThesis= (thesis)=> {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT TS.STATE AS STATE FROM THESIS T JOIN THESIS_STATUS TS ON T.ID_THESIS = TS.THESIS WHERE T.ID_THESIS = ?';
    db.get(sql, [thesis], (err, row) => {
      if (err) {
        reject(err);
      }
      else {
        if (row == undefined)
          resolve({"available":0, data:""})
        else{
          let thesis_status = {
            id:thesis,
            state : row.STATE
          };
          resolve({"available":1, data:thesis_status})
        }
      }
    });
  });
}


exports.acceptApplication = (thesis, student) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE THESIS_APPLICATION SET STATE = 1 WHERE THESIS = ? AND STUDENT = ? AND STATE = 0';
    db.run(sql, [thesis, student], function (err) {
      if (err) {
        reject(err);
         
      }
      resolve("Accepted");
    });
  });
};



exports.cancelApplications = (thesis, student) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE THESIS_APPLICATION SET STATE = 3 WHERE THESIS = ? AND STUDENT != ? AND STATE == 0';
    db.run(sql, [thesis, student], function (err) {
      if (err) {
        reject(err);
         
      }
      resolve("Canceled");
    });
  });
};



exports.rejectApplication = (thesis, student) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE THESIS_APPLICATION SET STATE = 2 WHERE THESIS = ? AND STUDENT = ? AND STATE = 0';
    db.run(sql, [thesis, student], function (err) {
      if (err) {
        reject(err);
         
      }
      resolve("Rejected");
    });
  });
};


exports.archiveThesis=(thesis) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE THESIS_STATUS SET STATE = 0 WHERE THESIS = ? AND STATE = 1';
    db.run(sql, [thesis], function (err) {
      if (err) {
        reject(err);
         
      }
      resolve("Archived");
    });
  });
}

exports.activateThesis=(thesis) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE THESIS_STATUS SET STATE = 1 WHERE THESIS = ? AND STATE = 0';
    db.run(sql, [thesis], function (err) {
      if (err) {
        reject(err);
         
      }
      resolve("Activated");
    });
  });
}

exports.editThesis = (id, title, description, req_know, notes, exp_date, level, degree) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE thesis SET title = ?, description = ?, required_knowledge = ?, notes = ?, expiration_date = ?, level = ?, degree = ? WHERE id_thesis = ?';
    db.run(sql, [title, description, req_know, notes, exp_date, level, degree, id], function (err) {
      if (err) {
        reject(err);
         
      }
      resolve(this.lastID);
    });
  });
};

exports.deleteCoSupervisor = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM co_supervisor WHERE thesis = ?';
    db.run(sql, [id], function (err) {
      if (err) {
        reject(err);
         
      }
      resolve(1);
    });
  });
};

exports.deleteKeyword = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM keyword WHERE thesis = ?';
    db.run(sql, [id], function (err) {
      if (err) {
        reject(err);
         
      }
      resolve(1);
    });
  });
};

exports.deleteType = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM TYPE WHERE thesis = ?';
    db.run(sql, [id], function (err) {
      if (err) {
        reject(err);
         
      }
      resolve(1);
    });
  });
}

exports.checkExistenceApplicationForThesis= (thesis)=> {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM THESIS_APPLICATION WHERE THESIS = ?';
    db.get(sql, [thesis], (err, row) => {
      if (err) {
        reject(err);
         
      }
      else {
        if (row == undefined)
          resolve(0)
        else{
          resolve(row.ID_APPLICATION)
        }
      }
    });
  });
}

exports.checkExistenceAcceptedApplicationForThesis= (thesis)=> {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM THESIS_APPLICATION WHERE THESIS = ? AND STATE=1';
    db.get(sql, [thesis], (err, row) => {
      if (err) {
        reject(err);
         
      }
      else {
        if (row == undefined)
          resolve(0)
        else{
          resolve(1)
        }
      }
    });
  });
}

exports.checkRequestExistance = (reqID) => {

  return new Promise((resolve,reject) => {
    const sql= 'SELECT * FROM THESIS_REQUEST WHERE ID_REQUEST=?';

    db.get(sql,[reqID], (err, row) => {
      if(err){
        console.log(err);
        reject(err);
      } else{
        if(row == undefined){
          resolve(0);
        } else{
          resolve(1);
        }
      }


    })
  })


};

exports.getRequestTeacher = (reqID) => {

  return new Promise((resolve,reject) => {
    const sql= 'SELECT SUPERVISOR FROM THESIS_REQUEST WHERE ID_REQUEST=?';

    db.get(sql,[reqID], (err, row) => {
      if(err){
        reject(err);
         
      } 
      resolve(row.SUPERVISOR);
        
    })
  })


};

exports.getRequestStudent = (reqID) => {

  return new Promise((resolve,reject) => {
    const sql= 'SELECT STUDENT FROM THESIS_REQUEST WHERE ID_REQUEST=?';

    db.get(sql,[reqID], (err, row) => {
      if(err){
        reject(err);
         
      }
      resolve(row.STUDENT);
    })
  })


};

exports.getVirtualDate= ()=> {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT data FROM VIRTUAL_CLOCK';
    db.get(sql, [], (err, row) => {
      if (err) {
        reject(err);
         
      }
      else {
        if (row.data == null)
          resolve(0)
        else{
          resolve(row.data)
        }
      }
    });
  });
}

exports.setVirtualDate= (date)=> {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE VIRTUAL_CLOCK SET data=?';
    db.get(sql, [date], (err, row) => {
      if (err) {
        reject(err);
         
      }
      resolve(this.lastID)
    });
  });
}

exports.resetStatusPastApplications = (date)=> {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE THESIS_APPLICATION SET STATE = 0 WHERE STATE = 3 AND THESIS IN (SELECT THESIS FROM THESIS_APPLICATION WHERE date(APPLICATION_DATE) > date(?) AND STATE=1)';
    db.get(sql, [date], (err, row) => {
      if (err) {
        reject(err);
         
      }
      resolve(1)
    });
  });
}

exports.deleteFutureApplications = (date)=> {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM THESIS_APPLICATION WHERE date(APPLICATION_DATE) > date(?)';
    db.get(sql, [date], (err, row) => {
      if (err) {
        reject(err);
         
      }
      resolve(1)
    });
  });
}

exports.getMailStudent = (studentID) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT EMAIL FROM STUDENT  WHERE ID=?';
    db.get(sql, [studentID], (err, row) => {
      if (err) {
        reject(err);
         
      }
      else {
        resolve(row.EMAIL)
      }
    });
  });
}


exports.getMailTeacher = (teacherId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT EMAIL FROM TEACHER WHERE ID=?';
    db.get(sql, [teacherId], (err, row) => {
      if (err) {
        reject(err);
         
      }
      else {
        resolve(row.EMAIL)
      }
    });
  });
}


exports.setStatusDeleted = (thesis) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE THESIS_STATUS SET STATE = 2 WHERE THESIS = ?';
    db.run(sql, [thesis], function (err) {
      if (err) {
        reject(err);
         
      }
      resolve("updated");
    });
  });

};


exports.cancelApplicationsByThesis = (thesis) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE THESIS_APPLICATION SET STATE = 3 WHERE STATE = 0 AND THESIS = ?';
    db.run(sql, [thesis], function (err) {
      if (err) {
        reject(err);
         
      }
      resolve("Canceled");
    });
  });
};

exports.cancelPendingApplications = (thesis) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE THESIS_APPLICATION SET STATE = 3 WHERE THESIS = ? AND STATE = 0';
    db.run(sql, [thesis], function (err) {
      if (err) {
        reject(err);
         
      }
      resolve("Canceled");
    });
  });
};


exports.insertCv = (applId, filename, path) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO PDF_TABLE (ID_APPLICATION, FILENAME, PATH) VALUES (?,?,?)';
    db.run(sql, [applId,filename,path], function (err) {
      if (err) {
        reject(err);
         
      }
      resolve("Cv uploaded");
    });
  });
}


exports.getStudentInfo = (studentId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT ID, NAME, SURNAME, EMAIL FROM STUDENT WHERE ID=?';
    db.get(sql, [studentId], (err,row) => {
      if (err) {
        reject(err);
         
      }
      if(row == undefined){
        resolve({});
      } else{

        let info = {
          id: row.ID,
          name: row.NAME,
          surname: row.SURNAME,
          email: row.EMAIL,
          exams: [],
          state: 0,
          cv: null
        }

        resolve(info);
      }
      
    });
  });
}

exports.getStudentExams = (studentId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT COD_COURSE, TITLE_COURSE, CFU, GRADE, DATE FROM CAREER WHERE ID=?';
    db.all(sql, [studentId], (err,rows) => {
      if (err) {
        reject(err);
         
      }
    
        let exams = rows.map((elem) => ({
          cod_course: elem.COD_COURSE,
          title_course: elem.TITLE_COURSE,
          cfu: elem.CFU,
          grade: elem.GRADE,
          date: elem.DATE

        }));

        resolve(exams);
      
    });
  });
}


exports.getCv = (applId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT FILENAME, PATH FROM PDF_TABLE WHERE ID_APPLICATION=?';
    db.get(sql, [applId], (err,row) => {
      if (err) {
        reject(err);
         
      }
      if(row == undefined){
        resolve({
          filename: null,
          path: null
        })
      } else{
        let cv = {
          filename: row.FILENAME,
          path: row.PATH
        }

        resolve(cv);
      }     
    });
  });
}


exports.checkExistenceApplicationById= (idApplication,date)=> {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT STUDENT, STATE, EXPIRATION_DATE FROM THESIS_APPLICATION TA, THESIS T WHERE T.ID_THESIS=TA.THESIS AND ID_APPLICATION = ?';
    db.get(sql, [idApplication], (err, row) => {
      if (err) {
        reject(err);
         
      }
      else {
        if (row == undefined)
          resolve(0)
        else{
          let appl = {
            student: row.STUDENT,
            state: ((date == 0) ? row.STATE : (date > row.EXPIRATION_DATE && row.STATE == 0) ? 3 : row.STATE),
          }
          
          resolve(appl)
        }
      }
    });
  });
}


exports.updateThesisStatus = (date) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE THESIS_STATUS SET STATE = 0 WHERE STATE = 1 AND THESIS IN ( SELECT ID_THESIS FROM THESIS WHERE date(EXPIRATION_DATE) < date(?))';
    db.run(sql, [date], function(err){
      if (err) {
        reject(err);
         
      }
      else {
          resolve("Updated")
      }
    });
  });
}


exports.cancelPendingApplicationsExpiredThesis = (date) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE THESIS_APPLICATION SET STATE = 3 WHERE STATE = 0 AND THESIS IN ( SELECT ID_THESIS FROM THESIS WHERE date(EXPIRATION_DATE) < date(?))';
    db.run(sql, [date], function(err){
      if (err) {
        reject(err);
         
      }
      else {
          resolve("Updated")
      }
    });
  });
}

exports.getTeacherRequests = (teacherID) => {

  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM THESIS_REQUEST WHERE SUPERVISOR=? AND STATUS IN (1, 3, 4, 5)";
    db.all(sql, [teacherID], (err,rows) => {
      if (err) {
        reject(err);
         
      }
      
      let requests = rows.map((elem)=> ({
        id: elem.ID_REQUEST,
        student: elem.STUDENT,
        supervisor: elem.SUPERVISOR,
        title: elem.TITLE,
        description: elem.DESCRIPTION,
        request_date: elem.REQUEST_DATE,
        approval_date: elem.APPROVAL_DATE,
        notes: elem.NOTES,
        status: elem.STATUS
      }))

      resolve(requests);

    });
  });



}



exports.getSecretaryRequests = () => {

  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM THESIS_REQUEST";
    db.all(sql, [], (err,rows) => {
      if (err) {
        reject(err);
         
      }
      
      let requests = rows.map((elem)=> ({
        id: elem.ID_REQUEST,
        student: elem.STUDENT,
        supervisor: elem.SUPERVISOR,
        title: elem.TITLE,
        description: elem.DESCRIPTION,
        request_date: elem.REQUEST_DATE,
        approval_date: elem.APPROVAL_DATE,
        notes: elem.NOTES,
        status: elem.STATUS
      }))

      resolve(requests);

    });
  });



}


exports.getStudentRequests = (studentID) => {

  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM THESIS_REQUEST WHERE STUDENT=?";
    db.all(sql, [studentID], (err,rows) => {
      if (err) {
        reject(err);
         
      }
      
      let requests = rows.map((elem)=> ({
        id: elem.ID_REQUEST,
        student: elem.STUDENT,
        supervisor: elem.SUPERVISOR,
        title: elem.TITLE,
        description: elem.DESCRIPTION,
        request_date: elem.REQUEST_DATE,
        approval_date: elem.APPROVAL_DATE,
        notes: elem.NOTES,
        status: elem.STATUS
      }))

      resolve(requests);

    });
  });



}

exports.getRequestCoSup = (reqID) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM REQUEST_COSUPERVISOR WHERE REQUEST=?';
    db.all(sql, [reqID], (err, rows) => {
      if (err) {
        reject(err);
         
      }
      
        let cosup=rows.map((elem) => ({
          name: elem.NAME,
          surname: elem.SURNAME,
          email: elem.EMAIL
        }))

        resolve(cosup);
      }
    );
  });



}


exports.checkPendingStudentRequests = (studentID) =>{
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM THESIS_REQUEST WHERE STUDENT=? AND STATUS IN (0,1,3,5)';
    db.get(sql, [studentID], (err, row) => {
      if (err) {
        reject(err);
         
      }
      if(row == undefined){
        resolve(0);
      } else{
        resolve(1);
      }
    });
  });
}

exports.insertRequest = (supervisor, title, description,  student, request_date, approval_date, status) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO THESIS_REQUEST (STUDENT, SUPERVISOR, TITLE, DESCRIPTION, REQUEST_DATE, APPROVAL_DATE, STATUS) VALUES (?,?,?,?,?,?,?)';
    db.run(sql, [student,supervisor,title, description,request_date,approval_date, status], function (err) {
      if (err) {
        reject(err);
         
      }
      resolve(this.lastID);
    });
  });
}

exports.insertCoSupervisorRequest = (request, name, surname, email) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO REQUEST_COSUPERVISOR (REQUEST, NAME, SURNAME, EMAIL) VALUES (?,?,?,?)';
    db.run(sql, [request, name, surname, email ], function (err) {
      if (err) {
        reject(err);
        console.log(err)
         
      }
      resolve("inserted");
    });
  });
}

exports.approveRequestSecretary = (requestID) =>{
  return new Promise((resolve, reject) => {
    const sql = "UPDATE THESIS_REQUEST SET STATUS = 1 WHERE STATUS = 0 AND ID_REQUEST == ?";
    db.run(sql, [requestID], function (err) {
      if (err) {
        reject(err);
         
      }
      resolve(1);
    });
  });
}

exports.rejectRequestSecretary = (requestID) =>{
  return new Promise((resolve, reject) => {
    const sql = "UPDATE THESIS_REQUEST SET STATUS = 2 WHERE STATUS = 0 AND ID_REQUEST == ?";
    db.run(sql, [requestID], function (err) {
      if (err) {
        reject(err);
         
      }
      resolve(1);
    });
  });
}


exports.approveRequestTeacher = (requestID,date) =>{
  return new Promise((resolve, reject) => {
    const sql = "UPDATE THESIS_REQUEST SET STATUS = 3, APPROVAL_DATE=? WHERE STATUS = 1 AND ID_REQUEST = ?";
    db.run(sql, [date,requestID], function (err) {
      if (err) {
        reject(err);
         
      }
      resolve(1);
    });
  });
}

exports.rejectRequestTeacher = (requestID) =>{
  return new Promise((resolve, reject) => {
    const sql = "UPDATE THESIS_REQUEST SET STATUS = 4 WHERE STATUS = 1 AND ID_REQUEST == ?";
    db.run(sql, [requestID], function (err) {
      if (err) {
        reject(err);
         
      }
      resolve(1);
    });
  });
}

exports.changeRequestTeacher = (reqID, notes) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE THESIS_REQUEST SET STATUS = 5, NOTES = ? WHERE STATUS = 1 AND ID_REQUEST = ?";
    db.run(sql, [notes,reqID], function (err) {
      if (err) {
        reject(err);
         
      }
      resolve(1);
    });
  });
}

exports.deleteRequestCoSupervisor = (reqID) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM REQUEST_COSUPERVISOR WHERE REQUEST=?";
    db.run(sql, [reqID], function (err) {
      if (err) {
        reject(err);
         
      }
      resolve(1);
    });
  });
}

