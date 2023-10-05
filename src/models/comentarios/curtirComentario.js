const conn = require('../../config/database');
module.exports = async (idComentario, idUser) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'insert into curtidas_comentarios (idComentario, idUser) values (?,?)',
            [idComentario, idUser],
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