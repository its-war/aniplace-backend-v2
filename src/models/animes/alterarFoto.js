const conn = require('../../config/database');
module.exports = async (nomeImg, campo, id) => {
    let imgAntiga = await new Promise((resolve, reject) => {
        conn.query('select '+campo+' from animes where idAnime=?', [id], (err, result, fields) => {
            if(result.length <= 0){
                resolve(false);
            }else{
                if(err){
                    reject(false);
                }else{
                    resolve(result[0][campo]);
                }
            }
        });
    });

    if(imgAntiga){
        return new Promise((resolve, reject) => {
            conn.query('update animes set '+campo+' = ? where idAnime=?', [nomeImg, id], (err, result, fields) => {
                if(err){
                    reject(false);
                }else{
                    resolve(imgAntiga);
                }
            });
        });
    }else{
        return false;
    }
}