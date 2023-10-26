const conn = require('../../config/database');
module.exports = async (idUser, idAnime) => {
    return new Promise((resolve, reject) => {
        conn.query(
            `INSERT IGNORE INTO atividade (idUser, idAnime) VALUES (?, ?)`,
            [idUser, idAnime],
            (err, result, fields) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result.affectedRows > 0);
                }
            }
        );
    });
}