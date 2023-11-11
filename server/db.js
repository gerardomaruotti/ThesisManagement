'use strict';

const sqlite = require('sqlite3');
const crypto = require('crypto');


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