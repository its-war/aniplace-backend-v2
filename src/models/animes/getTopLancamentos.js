const conn = require('../../config/database');
module.exports = async (limite, campos = '*') => {
    return new Promise((resolve, reject) => {
        conn.query(`select ${campos} from animes where acessos > 0 and status = 2 order by acessos desc limit ?`, limite, (err, results, fields) => {
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