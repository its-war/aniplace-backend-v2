const conn = require('../../config/database');
module.exports = async (idOrigem, tipo) => {
    return new Promise((resolve, reject) => {
        conn.query(
            `delete from comentarios where idOrigem=? and tipo=?`,
            [idOrigem, tipo],
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