const conn = require('../../config/database');
module.exports = async () => {
    return new Promise((resolve, reject) => {
        conn.query('select idAnime, nome from animes order by idAnime desc', (err, result, fields) => {
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        });
    });
}