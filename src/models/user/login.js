const conn = require('../../config/database');
module.exports = async (username) => {
    return new Promise((resolve, reject) => {
        conn.query('select idUser, nome, ranking, foto, chave, senha from user where lower(username) = lower(?)', username, (err, result, fields) => {
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