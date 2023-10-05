const conn = require('../../config/database');
module.exports = async (idSocket, texto, registro) => {
    return new Promise((resolve, reject) => {
        let obj = {
            idSocket: idSocket,
            texto: texto,
            registro: registro,
            validade: 120000
        }
        conn.query('insert into captcha set ?', obj, (err, result, fields) => {
            if(err){
                reject(err);
            }else{
                resolve(result.insertId);
            }
        });
    });
}