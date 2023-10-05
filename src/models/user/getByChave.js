const conn = require('../../config/database');
module.exports = async (chave) => {
    return new Promise((resolve, reject) => {
        conn.query('select idUser from user where chave=?', chave, (err, result, fields) => {
            if(err){
                reject(err);
            }else{
                if(result.length > 0){
                    resolve(result[0]);
                }else{
                    resolve(false);
                }
            }
        });
    });
}