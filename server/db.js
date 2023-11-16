'use strict';

const sqlite = require('sqlite3');
const crypto = require('crypto');
const { Console } = require('console');


const db = new sqlite.Database('thesis_management.db', (err) => {
    if(err) throw err;
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
            let keywords=[];
            rows.forEach((elem)=>(
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
            let keywords=[];
            rows.forEach((elem)=>(
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
            let types=[];
            rows.forEach((elem)=>
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
            let types=[];
            rows.forEach((elem)=>
                types.push(elem.TYPE)
            )
            resolve(types)
        }
      });
    });
  };
  
  exports.getTeachers = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT NAME,SURNAME, EMAIL FROM TEACHER';
      db.all(sql, [], (err, rows) => {
        if (err) { 
            reject(err); 
            return;
        }
        else {
            const teachers=rows.map((elem)=>({
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
            let teacher={
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
            const coSupervisors=rows.map((elem)=>({
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
          let coSupervisors=[];
          rows.forEach((elem)=>(
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
            const cds=rows.map((elem)=> ({
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

  exports.getTitleDegree = (codDegree) =>{
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
            const groups=rows.map((elem)=> ({
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
            let groups=[];
            rows.forEach((elem)=> (
                groups.push(elem.cod_group)
            ))
            resolve(groups)
        }
      });
    });
  };

  exports.getRole = (auth0) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM STUD_AUTH0 WHERE ID_AUTH0=? ';
      db.get(sql, [auth0.payload.sub], (err, elem) => {
        if (err) { 
            reject(err); 
            return;
        }
        else {
            if (elem != undefined)
              resolve({"role":"student", "id":elem.ID})
            else{
              const sql2 = 'SELECT * FROM TEACHER_AUTH0 WHERE ID_AUTH0=? ';
              db.get(sql2, [auth0], (err, elem) => {
                if (err) { 
                    reject(err); 
                    return;
                }
                else {
                  if (elem != undefined)
                    resolve({"role":"teacher", "id":elem.ID})
                  else
                    resolve({})//non ritorna nulla se non è autenticato, ma qua non entra
                }
              });
            }
          }
        });
    });
  }

  exports.getThesisTeacher=(ID)=>{
    return new Promise((resolve, reject) => {
      const sql = 'SELECT DISTINCT T.ID_THESIS as ID, T.TITLE AS title, T.NOTES as notes, T.DESCRIPTION AS description , T.REQUIRED_KNOWLEDGE AS req_know, TE.NAME AS sup_name, TE.SURNAME AS sup_surname FROM THESIS T JOIN TEACHER TE ON T.SUPERVISOR == TE.ID WHERE TE.ID = ?';
      db.all(sql, [ID], (err, rows) => {
        if (err) { 
            reject(err); 
            return;
        }
        else {
          if (rows.length > 0 ){
            const thesis=rows.map((elem)=> ({
              ID: elem.ID,
              title: elem.title,
              description: elem.description,
              req_know: elem.req_know,
              sup_name: elem.sup_name,
              sup_surname: elem.sup_surname,
              notes : elem.notes,
              keywords:[]
            }))
            resolve(thesis)
          }else{
            resolve([])
          }
        }
      });
    });
  }

  exports.getThesisStudent=(ID)=>{
    return new Promise((resolve, reject) => {
      const sql = 'SELECT DISTINCT T.ID_THESIS as ID, T.TITLE AS title, T.NOTES as notes, T.DESCRIPTION AS description , T.REQUIRED_KNOWLEDGE AS req_know, TE.NAME AS sup_name, TE.SURNAME AS sup_surname FROM THESIS T JOIN STUDENT S ON S.COD_DEGREE == T.DEGREE JOIN TEACHER TE ON T.SUPERVISOR == TE.ID WHERE S.ID = ?';
      db.all(sql, [ID], (err, rows) => {
        if (err) { 
            reject(err); 
            return;
        }
        else {
          console.log(rows)
          if (rows.length>0){
            const thesis=rows.map((elem)=> ({
              ID: elem.ID,
              title: elem.title,
              description: elem.description,
              req_know: elem.req_know,
              sup_name: elem.sup_name,
              sup_surname: elem.sup_surname,
              notes : elem.notes,
              keywords:[]
            }))

            resolve(thesis)
          }else{
            resolve([])
          }
        }
      });
    });
  }
  exports.getThesisStudentFiltered=(ID, filters)=>{
    return new Promise((resolve, reject) => {
      const sql = 'SELECT DISTINCT T.ID_THESIS as ID, T.TITLE AS title, T.NOTES as notes, T.DESCRIPTION AS description , T.REQUIRED_KNOWLEDGE AS req_know, TE.NAME AS sup_name, TE.SURNAME AS sup_surname FROM THESIS T JOIN STUDENT S ON S.COD_DEGREE == T.DEGREE JOIN TEACHER TE ON T.SUPERVISOR == TE.ID JOIN TYPE TY ON T.ID_THESIS == TY.THESIS JOIN KEYWORD K ON T.ID_THESIS == K.THESIS JOIN CO_SUPERVISOR CS ON T.ID_THESIS == CS.THESIS WHERE S.ID = ? AND (TY.TYPE IN (?) OR ? IS NULL) AND (K.KEYWORD IN (?) OR ? IS NULL) AND (CS.EMAIL IN (?) OR ? IS NULL) AND (T.SUPERVISOR IN (?) OR ? IS NULL) AND (TE.COD_GROUP IN (?) OR ?  IS NULL) AND (T.EXPIRATION_DATE < ? OR ? IS NULL)';
      db.all(sql, [ID, filters.type, filters.type, filters.keyword, filters.keyword, filters.cosupervisor, filters.cosupervisor, filters.supervisor, filters.supervisor, filters.group, filters.group, filters.exp_date, filters.exp_date], (err, rows) => {
        if (err) { 
            reject(err); 
            return;
        }
        else {
          console.log(rows)
          if (rows.length>0){
            const thesis=rows.map((elem)=> ({
              ID: elem.ID,
              title: elem.title,
              description: elem.description,
              req_know: elem.req_know,
              sup_name: elem.sup_name,
              sup_surname: elem.sup_surname,
              notes : elem.notes,
              keywords:[]
            }))

            resolve(thesis)
          }else{
            resolve([])
          }
        }
      });
    });
  }

  exports.insertThesis = (title,description,req_know,notes,exp_date,level,degree,supervisor) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO thesis (title, description, required_knowledge, notes, expiration_date, level, degree, supervisor) VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
      db.run(sql, [title,description,req_know,notes,exp_date,level,degree,supervisor], function (err) {
        if (err) {
          console.log(err)
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
          console.log(err)
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
          console.log(err)
          reject(err);
          return;
        }
        resolve(this.lastID);
      });
    });
  };

  exports.insertThesisStatus= (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO THESIS_STATUS (thesis, state) VALUES(?, ?)';
      db.run(sql, [id, 1], function (err) {
        if (err) {
          console.log(err)
          reject(err);
          return;
        }
        resolve(this.lastID);
      });
    });
  }

  exports.insertType= (id,type) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO TYPE (thesis, type) VALUES(?, ?)';
      db.run(sql, [id, type], function (err) {
        if (err) {
          console.log(err)
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


exports.insertProposal = (userId,idThesis) => {
  return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO THESIS_PROPOSAL (student, thesis, state) VALUES(?, ?, ?)';
      db.run(sql, [userId, idThesis, 0], function(err){
          if (err) {
              console.log(err)
              reject(err);
              return;
          }
              resolve(this.lastID);
      });
  });
}