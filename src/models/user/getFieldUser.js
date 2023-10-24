const conn = require('../../config/database');
module.exports = async (idUser, campos = '*') => {
    return new Promise((resolve, reject) => {
        conn.query(
            `select ${campos} from user where idUser = ?`,
            idUser,
            (err, result, fields) => {
                if(err){
                    reject(err);
                }else{
                    if(result.length > 0){
                        resolve(result[0]);
                    }else{
                        resolve([]);
                    }
                }
            }
        );
    });
}