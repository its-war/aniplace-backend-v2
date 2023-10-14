const conn = require('../../config/database');
module.exports = async (idPostagem, idUser) => {
    return new Promise((resolve, reject) => {
        conn.query(
            `select idCurtida from curtidas_postagens where idPostagem=? and idUser=?`,
            [idPostagem, idUser],
            (err, result, fields) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result.length > 0);
                }
            }
        );
    });
}