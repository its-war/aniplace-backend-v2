const conn = require('../../config/database');
module.exports = async (idCaptcha, texto) => {
    return new Promise((resolve, reject) => {
        conn.query('select * from captcha where idCaptcha=? and lower(texto) = lower(?)', [idCaptcha, texto], (err, result, fields) => {
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