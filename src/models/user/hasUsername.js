const conn = require('../../config/database');
module.exports = async (username) => {
    return new Promise((resolve, reject) => {
        conn.query('select idUser from user where username=?', username, (err, result, fields) => {
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