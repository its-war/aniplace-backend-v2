const conn = require('../../config/database');
module.exports = (anime) => {
    return new Promise((resolve, reject) => {
        conn.query('insert into animes set ?', anime, (err, result, fields) => {
            if(err){
                reject(err);
            }else{
                resolve(result.insertId);
            }
        });
    });
}