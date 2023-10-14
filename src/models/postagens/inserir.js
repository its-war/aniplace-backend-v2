const conn = require('../../config/database');
module.exports = async (texto, imagem, idUser) => {
    return new Promise((resolve, reject) => {
        conn.query(
            `insert into postagens (texto, imagem, idUser) VALUES (?,?,?)`,
            [texto, imagem, idUser],
            (err, result, fields) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result.insertId);
                }
            }
        );
    });
}