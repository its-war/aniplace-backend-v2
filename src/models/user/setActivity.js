const conn = require('../../config/database');
module.exports = async (idUser, numeroAtividades) => {
    return new Promise((resolve, reject) => {
        conn.query(
            `update user set atividade = atividade + ? where idUser = ?`,
            [numeroAtividades, idUser],
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