const conn = require('../../config/database');
module.exports = async (idAnime, numero, temporada) => {
    return new Promise((resolve, reject) => {
        conn.query(
            `select *
            from episodios
            where idAnime=? and temporada=? and numero=?`,
            [idAnime, temporada, numero],
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