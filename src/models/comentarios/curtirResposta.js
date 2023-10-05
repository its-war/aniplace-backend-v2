const conn = require('../../config/database');
module.exports = async (idResposta, idUser) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'insert into curtidas_respostas (idResposta, idUser) values (?,?)',
            [idResposta, idUser],
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