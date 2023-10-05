const conn = require('../../config/database');
module.exports = async (idComentario, idUser) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'select idCurtida from curtidas_comentarios where idUser=? and idComentario=?',
            [idUser, idComentario],
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