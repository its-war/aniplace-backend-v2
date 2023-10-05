const conn = require('../../config/database');
module.exports = async (idDestaque) => {
    return new Promise((resolve, reject) => {
        conn.query(
            `
            DELETE FROM destaques WHERE idDestaque = ?
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