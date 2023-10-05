const conn = require('../../config/database');
module.exports = async (limite = 10) => {
    return new Promise((resolve, reject) => {
        conn.query(
            `SELECT 
                a.idAnime,
                a.nome,
                a.capa,
                SUM(r.nota * r.vote_count) / SUM(r.vote_count) AS weighted_average
            FROM (
                SELECT idAnime, nota, COUNT(*) AS vote_count
                FROM rating
                GROUP BY idAnime, nota
            ) AS r
            JOIN animes a ON r.idAnime = a.idAnime
            GROUP BY a.idAnime
            ORDER BY weighted_average DESC
            LIMIT ?`,
            limite,
            (err, results, fields) => {
                if(err){
                    reject(err);
                }else{
                    resolve(results);
                }
            }
        );
    });
}