const conn = require('../../config/database');
module.exports = async () => {
    return new Promise((resolve, reject) => {
        conn.query(
            `
            SELECT d.idDestaque, d.capa as dCapa, 
                   a.nome, a.idAnime, a.capa as aCapa, a.sinopse
            FROM destaques d
                INNER JOIN animes a ON d.idAnime = a.idAnime
            ORDER BY d.numero, d.idDestaque DESC
            `,
            (err, results, fields) => {
                if(err){
                    reject(err);
                }else{
                    const destaques = results.map(d => ({
                        idDestaque: d.idDestaque,
                        capa: d.dCapa ?? d.aCapa,
                        //anime
                        idAnime: d.idAnime,
                        nome: d.nome,
                        sinopse: d.sinopse
                    }));
                    resolve(destaques);
                }
            }
        );
    });
}