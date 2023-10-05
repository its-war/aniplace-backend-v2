const conn = require('../../config/database');
module.exports = async (idCaptcha) => {
    return new Promise((resolve, reject) => {
        conn.query('delete from captcha where idCaptcha=?', idCaptcha, (err, result, fields) => {
            if(err){
                reject(err);
            }else{
                resolve(result.affectedRows > 0);
            }
        });
    });
}