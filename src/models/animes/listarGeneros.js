const conn = require('../../config/database');
module.exports = async (idGeneros = false) => {
    return new Promise((resolve, reject) => {
        let sql;
        if(idGeneros){
            sql = 'select * from generos where idGenero in ('+idGeneros+')';
        }else{
            sql = 'select * from generos order by nome asc';
        }
        conn.query(sql, (err, resultsGeneros, fieldsGeneros) => {
            if(err){
                reject(err);
            }else{
                resolve(resultsGeneros);
            }
        });
    });
}