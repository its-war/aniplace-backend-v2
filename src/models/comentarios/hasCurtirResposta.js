const conn = require('../../config/database');
module.exports = async (idResposta, idUser) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'select idCurtida from curtidas_respostas where idUser=? and idResposta=?',
            [idUser, idResposta],
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