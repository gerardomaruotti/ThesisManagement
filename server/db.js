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

  exports.getThesis = (idThesis) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM THESIS WHERE id_thesis=?';
        db.get(sql, [idThesis], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            if (row == undefined) {
                resolve({ error: 'Thesis not found.' });
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