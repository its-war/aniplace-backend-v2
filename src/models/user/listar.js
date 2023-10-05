const conn = require('../../config/database');
module.exports = async (pagina = 1, quantidade = 10, campos = 'idUser, nome, status, email, ranking') => {
    return new Promise((resolve, reject) => {
        let offset = (pagina - 1) * quantidade;
        conn.query(`select ${campos} from user order by idUser desc limit ? offset ?`, [quantidade, offset], (err, results, fields) => {
            if(err){
                reject(err);
            }else{
                resolve(results);
            }
        });
    });
}