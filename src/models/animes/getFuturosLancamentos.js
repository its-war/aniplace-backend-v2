const conn = require('../../config/database');
module.exports = async (limite) => {
    if(typeof limite !== 'number'){
        limite = parseInt(limite);
    }
    return new Promise((resolve, reject) => {
        conn.query(
            `
            select a.idAnime, a.nome, a.capa, a.temporadaLancamento
            from animes a
            where a.status = 2
              and a.dia > 0
              and (select count(idEpisodio) as valor
                   from episodios e 
                   where e.idAnime = a.idAnime and e.temporada = a.temporadaLancamento) = 0
            order by a.idAnime desc ${limite > 0 ? 'limit ' + limite : ''}
            `,
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