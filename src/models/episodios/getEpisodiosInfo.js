const conn = require('../../config/database');
module.exports = async () => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT SUM(acessos) / COUNT(idEpisodio) as media, COUNT(idEpisodio) as totalEpisodios FROM episodios', (err, results, fields) => {
            if(err){
                reject(err);
            }else{
                resolve(results[0]);
            }
        });
    });
}