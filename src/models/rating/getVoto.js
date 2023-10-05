const conn = require('../../config/database');
module.exports = async (idAnime, idUser) => {
    return new Promise((resolve, reject) => {
        conn.query('select nota from rating where idAnime=? and idUser=?', [idAnime, idUser], (err, result, fields) => {
            if(err){
                reject(err);
            }else{
                if(result.length > 0){
                    resolve(result[0].nota);
                }else{
                    resolve(null);
                }
            }
        });
    });
}