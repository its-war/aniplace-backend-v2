const conn = require('../../config/database');
module.exports = async (idPostagem, idUser) => {
    return new Promise((resolve, reject) => {
        conn.query(
            `insert into curtidas_postagens (idUser, idPostagem) VALUES (?,?)`,
            [idUser, idPostagem],
            (err, result, fields) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result.insertId > 0);
                }
            }
        );
    });
}