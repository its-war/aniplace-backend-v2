const conn = require('../../config/database');
module.exports = async (idAnime) => {
    return new Promise((resolve, reject) => {
        conn.query(
            `SELECT SUM(nota * vote_count) / SUM(vote_count) AS weighted_average, SUM(vote_count) as total_votes 
         FROM (SELECT nota, COUNT(*) AS vote_count 
                FROM rating WHERE idAnime = ? GROUP BY nota)
         AS vote_counts`,
            [idAnime],
            (err, result, fields) => {
                if(err){
                    reject(err);
                }else{
                    resolve({nota: result[0].weighted_average, totalVotos: result[0].total_votes});
                }
            }
        );
    });
}