const conn = require('../../config/database');
module.exports = async (limite = 0, campos = '*') => {
    return new Promise((resolve, reject) => {
        let sql = `select ${campos} from animes where acessos > 0 and status = 1 order by acessos desc`;
        if(limite > 0){
            sql = `select ${campos} from animes where acessos > 0 and status = 1 order by acessos desc limit ?`;
        }
        conn.query(sql, limite, (err, results, fields) => {
            if(err){
                reject(err);
            }else{
                if(results.length > 0){
                    resolve(results);
                }else{
                    resolve([]);
                }
            }
        });
    });
}