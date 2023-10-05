const conn = require('../../config/database');
module.exports = async (id, dados) => {
    return new Promise((resolve, reject) => {
        conn.query('update animes set ? where idAnime=?', [dados, id], (err, result, fields) => {
            if(err){
                reject(err);
            }else{
                resolve(result.affectedRows > 0);
            }
        });
    });
}