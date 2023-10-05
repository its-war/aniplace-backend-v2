const conn = require('../../config/database');
module.exports = async (idComentario, idUser) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'delete from curtidas_comentarios where idUser=? and idComentario=?',
            [idUser, idComentario],
            (err, result, fields) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result.affectedRows > 0);
                }
            }
        );
    });
}