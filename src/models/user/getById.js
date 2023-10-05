const conn = require('../../config/database');
module.exports = async (iduser) => {
    return new Promise((resolve, reject) => {
        conn.query('select * from user where idUser=?', iduser, (err, result, fields) => {
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