const conn = require('../../config/database');
module.exports = async (idUser) => {
    return new Promise((resolve, reject) => {
        conn.query(
            `select a.idAnime, a.nome
             from atividade at
                      inner join animes a on at.idAnime = a.idAnime
             where at.idUser = ?`,
            idUser,
            (err, result, fields) => {
                if(err){
                    reject(err);
                }else{
                    const animes = result.map(a => ({
                        idAnime: a.idAnime,
                        nome: a.nome
                    }));
                    resolve(animes);
                }
            }
        );
    });
}