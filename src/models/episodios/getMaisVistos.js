const conn = require('../../config/database');
module.exports = async () => {
    return new Promise((resolve, reject) => {
        let sql = `select e.idEpisodio, e.numero, e.temporada, a.idAnime, a.nome, a.capa
                   from episodios e
                   inner join animes a
                   on e.idAnime=a.idAnime
                   where e.acessos > 0
                   order by e.acessos desc
                   limit 25`;
        conn.query(sql, (err, results, fields) => {
            if(err){
                reject(err);
            }else{
                const episodios = results.map(linha => ({
                    idEpisodio: linha.idEpisodio,
                    numero: linha.numero,
                    temporada: linha.temporada,
                    anime: {
                        idAnime: linha.idAnime,
                        nome: linha.nome,
                        capa: linha.capa
                    }
                }));
                resolve(episodios);
            }
        });
    });
}