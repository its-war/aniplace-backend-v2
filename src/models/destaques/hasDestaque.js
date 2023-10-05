const conn = require('../../config/database');
module.exports = async (idAnime) => {
    return new Promise((resolve, reject) => {
        conn.query(
            `
            SELECT idDestaque FROM destaques WHERE idAnime = ?
            `,
            idAnime,
            (err, result, fields) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result.length > 0);
                }
            }
        );
    });
}