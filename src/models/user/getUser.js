const conn = require('../../config/database');
module.exports = async (idUser) => {
    return new Promise((resolve, reject) => {
        let sql = `select idUser, nome, ranking, foto
                   from user
                   where idUser=?
        `;
        conn.query(sql, idUser, (err, result, fields) => {
            if(err){
                reject(err);
            }else{
                resolve(result[0]);
            }
        });
    });
}