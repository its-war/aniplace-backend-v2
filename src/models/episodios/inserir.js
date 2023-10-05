const conn = require('../../config/database');
module.exports = async (episodio) => {
    return new Promise((resolve, reject) => {
        conn.query('insert into episodios set ?', episodio, (err, result, fields) => {
            if(err){
                reject(err);
            }else{
                if(result.insertId){
                    resolve(result.insertId);
                }else{
                    resolve(false);
                }
            }
        });
    });
}