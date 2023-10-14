const conn = require('../../config/database');
module.exports = async (idPostagem, idUser) => {
    return new Promise((resolve, reject) => {
        conn.query(
            `delete from curtidas_postagens where idPostagem=? and idUser=?`,
            [idPostagem, idUser],
            (err, result, fields) => {
                if(err){
                    reject(err);
                }else{
                    resolve(!(result.affectedRows > 0));
                }
            }
        );
    });
}