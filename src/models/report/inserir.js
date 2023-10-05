const conn = require('../../config/database');
module.exports = async (idAnime, idEpisodio) => {
    return new Promise((resolve, reject) => {
        conn.query('insert into report set ?', {idAnime: idAnime, idEpisodio: idEpisodio}, (err, result, fields) => {
            if(err){
                reject(err);
            }else{
                resolve(result.insertId);
            }
        });
    });
}