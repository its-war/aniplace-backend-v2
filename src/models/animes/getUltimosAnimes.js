const conn = require('../../config/database');
module.exports = async (pagina = 1, quantidade = 10, campos = 'idAnime, nome, dia, status, acessos') => {
    return new Promise((resolve, reject) => {
        let offset = (pagina - 1) * quantidade;
        conn.query(`select ${campos} from animes order by idAnime desc limit ? offset ?`, [quantidade, offset], (err, results, fields) => {
            if(err){
                reject(err);
            }else{
                resolve(results);
            }
        });
    });
}