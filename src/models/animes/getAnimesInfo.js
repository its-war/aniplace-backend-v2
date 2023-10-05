const conn = require('../../config/database');
module.exports = async () => {
    return new Promise((resolve, reject) => {
        conn.query(`
                    SELECT
                          COUNT(idAnime) AS totalAnimes,
                          SUM(CASE WHEN status = 1 THEN 1 ELSE 0 END) AS animesCompletos,
                          SUM(CASE WHEN status = 2 THEN 1 ELSE 0 END) AS animesLancamento
                    FROM
                        animes;`,
            (err, result, fields) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result[0]);
                }
            }
        );
    });
}