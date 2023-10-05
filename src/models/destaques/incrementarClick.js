const conn = require('../../config/database');
module.exports = async (idDestaque) => {
    return new Promise((resolve, reject) => {
        conn.query(
            `
            UPDATE destaques SET clicks = clicks + 1 WHERE idDestaque = ?
            `,
            idDestaque,
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