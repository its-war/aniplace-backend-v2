const conn = require('../../config/database');
module.exports = async (idAnime, idUser) => {
    return new Promise((resolve, reject) => {
        conn.query('select idRating from rating where idAnime=? and idUser=?', [idAnime, idUser], (err, result, fields) => {
            if(err){
                reject(err);
            }else{
                resolve(result.length > 0);
            }
        });
    });
}