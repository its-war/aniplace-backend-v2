const conn = require('../../config/database');
/**
 * @param {Number|String} idUser
 * @param {Object} arrayDados
 * @returns {Promise<Boolean>}
 */
module.exports = async (idUser, arrayDados) => {
    return new Promise((resolve, reject) => {
        conn.query(
            `update user set ? where idUser = ?`,
            [arrayDados, idUser],
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