'use strict';

const sqlite = require('sqlite3');
const crypto = require('crypto');
const { Console } = require('console');


const db = new sqlite.Database('thesis_management.db', (err) => {
  if (err) throw err;
});



exports.getKeywords = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT DISTINCT keyword FROM KEYWORD';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
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
        return;
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
        return;
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
        return;
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
        return;
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
        return;
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
    const sql = 'SELECT NAME, SURNAME FROM CO_SUPERVISOR WHERE THESIS=?';
    db.all(sql, [idThesis], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      else {
        const coSupervisors = rows.map((elem) => ({
          name: elem.NAME,
          surname: elem.SURNAME
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
        return;
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
        return;
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
        return;
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
        return;
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
        return;
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
        return;
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
        return;
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
        return;
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
    const sql = 'SELECT S.ID AS ID, S.NAME AS NAME, S.SURNAME AS SURNAME, S.EMAIL AS EMAIL FROM STUD_AUTH0 SA JOIN STUDENT S ON S.ID == SA.ID  WHERE ID_AUTH0=? ';
    db.get(sql, [auth0.payload.sub], (err, elem) => {
      if (err) {
        reject(err);
        return;
      }
      else {
        if (elem != undefined)
          resolve({ "role": "student", "id": elem.ID, "name":elem.NAME, "surname": elem.SURNAME, "email": elem.EMAIL})
        else {
          const sql2 = 'SELECT T.ID AS ID, T.NAME AS NAME, T.SURNAME AS SURNAME, T.EMAIL AS EMAIL FROM TEACHER T JOIN TEACHER_AUTH0 TA ON T.ID == TA.ID WHERE ID_AUTH0=? ';
          db.get(sql2, [auth0.payload.sub], (err, elem) => {
            if (err) {
              reject(err);
              return;
            }
            else {
              if (elem != undefined)
                resolve({ "role": "teacher", "id": elem.ID , "name":elem.NAME, "surname": elem.SURNAME, "email": elem.EMAIL})
              else
                resolve({})//non ritorna nulla se non è autenticato, ma qua non entra
            }
          });
        }
      }
    });
  });
}

exports.getThesisTeacher = (ID) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT DISTINCT T.ID_THESIS as ID, TS.STATE AS status,  T.TITLE AS title, T.NOTES as notes, T.DESCRIPTION AS description , T.REQUIRED_KNOWLEDGE AS req_know, TE.NAME AS sup_name, TE.SURNAME AS sup_surname FROM THESIS T JOIN TEACHER TE ON T.SUPERVISOR == TE.ID JOIN THESIS_STATUS TS ON TS.THESIS == T.ID_THESIS WHERE TE.ID = ? ';
    db.all(sql, [ID], (err, rows) => {
      if (err) {
        reject(err);
        return;
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
            status : elem.status,
            count: 0,
            keywords: []
          }))
          resolve(thesis)
        } else {
          resolve([])
        }
      }
    });
  });
}

exports.getThesisStudent = (ID) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT DISTINCT T.ID_THESIS as ID, T.TITLE AS title, T.NOTES as notes, T.DESCRIPTION AS description , T.REQUIRED_KNOWLEDGE AS req_know, TE.NAME AS sup_name, TE.SURNAME AS sup_surname FROM THESIS T JOIN STUDENT S ON S.COD_DEGREE == T.DEGREE JOIN TEACHER TE ON T.SUPERVISOR == TE.ID WHERE S.ID = ?';
    db.all(sql, [ID], (err, rows) => {
      if (err) {
        reject(err);
        return;
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
            keywords: []
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
        return;
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
        return;
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
        return;
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
        return;
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
        return;
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
        return;
      }
      if (row == undefined) {
        reject({ error: 'Thesis not found.' });
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

exports.checkThesisActive = (idThesis) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT STATE FROM THESIS_STATUS WHERE THESIS=?';
    db.get(sql, [idThesis], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      if (row == undefined) {
        reject({ error: 'Thesis not found.' });
      } else {
        resolve(row.STATE);
      }
    });
  });
};


exports.insertApplication = (userId, idThesis) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO THESIS_APPLICATION (student, thesis, state) VALUES(?, ?, ?)';
    db.run(sql, [userId, idThesis, 0], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
}

exports.getTeacherApplications = (teacherId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT ID_THESIS,TITLE,EXPIRATION_DATE,LEVEL, DEGREE, STUDENT, S.NAME as NAME, S.SURNAME as SURNAME, S.EMAIL as EMAIL, STATE FROM THESIS T, TEACHER TE, THESIS_APPLICATION TA, STUDENT S WHERE T.SUPERVISOR=TE.ID AND T.ID_THESIS=TA.THESIS AND TA.STUDENT=S.ID AND TE.ID=?';
    db.all(sql, [teacherId], (err,rows) => {
      if (err) {
        reject(err);
        return;
      } else{
        const applications=rows.map((elem)=>({
          id: elem.ID_THESIS,
          title: elem.TITLE,
          expirationDate: elem.EXPIRATION_DATE,
          level: elem.LEVEL,
          degree: elem.DEGREE,
          student: elem.STUDENT,
          name: elem.NAME,
          surname: elem.SURNAME,
          email: elem.EMAIL,
          state: elem.STATE
        }));

        resolve(applications)
      }
      
    });
  });
}


exports.getStudentApplications = (studentId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT ID_THESIS,TITLE,EXPIRATION_DATE,LEVEL, DEGREE, SUPERVISOR, TE.NAME as NAME, TE.SURNAME as SURNAME, STATE FROM THESIS T, STUDENT S, THESIS_APPLICATION TA, TEACHER TE WHERE TA.STUDENT=S.ID AND T.ID_THESIS=TA.THESIS AND T.SUPERVISOR = TE.ID AND S.ID=?';
    db.all(sql, [studentId], (err,rows) => {
      if (err) {
        reject(err);
        return;
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
          state: elem.STATE,
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
        return;
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




exports.acceptApplication = (thesis, student) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE THESIS_APPLICATION SET STATE = 1 WHERE THESIS = ? AND STUDENT = ? AND STATE = 0';
    db.run(sql, [thesis, student], function (err) {
      if (err) {
        reject(err);
        return;
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
        return;
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
        return;
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
        return;
      }
      resolve("Archived");
    });
  });
}

exports.editThesis = (id, title, description, req_know, notes, exp_date, level, degree) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE thesis SET title = ?, description = ?, required_knowledge = ?, notes = ?, expiration_date = ?, level = ?, degree = ? WHERE id_thesis = ?';
    db.run(sql, [title, description, req_know, notes, exp_date, level, degree, id], function (err) {
      if (err) {
        reject(err);
        return;
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
        return;
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
        return;
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
        return;
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
        return;
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

