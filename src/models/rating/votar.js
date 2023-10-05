const conn = require('../../config/database');
module.exports = async (idAnime, idUser, nota) => {
    return new Promise((resolve, reject) => {
        conn.query(`insert into rating (idAnime, idUser, nota) values (?,?,?)`, [idAnime, idUser, nota], (err, result, fields) => {
            if(err) {
                reject(err);
            }else{
                resolve(result.affectedRows > 0);
            }
        });
    });
}