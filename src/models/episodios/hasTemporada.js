const conn = require('../../config/database');
module.exports = async (idAnime) => {
    return new Promise((resolve, reject) => {
        conn.query(
            `select COUNT(idEpisodio) as numeroEpisodios from episodios where idAnime=? group by temporada`,
            [idAnime],
            (err, result, fields) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            }
        );
    });
}