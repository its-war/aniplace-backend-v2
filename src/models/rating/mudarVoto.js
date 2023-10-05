const conn = require('../../config/database');
module.exports = async (idAnime, idUser, voto) => {
    return new Promise((resolve, reject) => {
        conn.query('update rating set nota=? where idAnime=? and idUser=?', [voto, idAnime, idUser], (err, result, fields) => {
            if(err){
                reject(err);
            }else{
                resolve(result.affectedRows > 0);
            }
        });
    });
}