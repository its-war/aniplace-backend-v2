const conn = require('../../config/database');
module.exports = (email) => {
    return new Promise((resolve, reject) => {
        conn.query('select idUser from user where email=?', email, (err, result, fields) => {
            if(err){
                reject(err);
            }else{
                if(result.length > 0){
                    resolve(true);
                }else{
                    resolve(false);
                }
            }
        });
    });
}