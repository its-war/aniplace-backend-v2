const conn = require('../../config/database');
module.exports = async (limite, pagina) => {
    if(typeof limite !== 'number'){
        limite = parseInt(limite);
    }
    if(typeof pagina !== 'number'){
        pagina = parseInt(pagina);
    }

    let offset = (pagina - 1) * limite;
    return new Promise(async (resolve, reject) => {
        const totalQuery = `
            SELECT COUNT(*) as total
            FROM episodios e
                     INNER JOIN animes a ON a.idAnime = e.idAnime
            WHERE a.status = 2
              AND e.temporada = (SELECT temporadaLancamento FROM animes WHERE idAnime = e.idAnime)
        `;
        const totalResult = await conn.promise().query(totalQuery);
        const totalRegistros = totalResult[0][0].total;
        const totalPages = Math.ceil(totalRegistros / limite);

        let sql = `
            SELECT a.idAnime, a.nome, a.capa, e.idEpisodio, e.numero, e.temporada,
                   e.registro, a.dia
            FROM episodios e
                     INNER JOIN animes a ON a.idAnime = e.idAnime
            WHERE a.status = 2
              AND e.temporada = (SELECT temporadaLancamento FROM animes WHERE idAnime = e.idAnime)
            GROUP BY e.idAnime, e.idEpisodio
            ORDER BY e.idEpisodio DESC
            LIMIT ? OFFSET ?
        `;
        conn.query(
            sql,
            [limite, offset],
            (err, results, fields) => {
                if(err){
                    reject(err);
                }else{
                    const episodios = results.map(ep => ({
                        idEpisodio: ep.idEpisodio,
                        numero: ep.numero,
                        temporada: ep.temporada,
                        registro: ep.registro,
                        anime: {
                            idAnime: ep.idAnime,
                            nome: ep.nome,
                            capa: ep.capa,
                            dia: ep.dia
                        }
                    }));
                    resolve({episodios: episodios, total: totalPages});
                }
            }
        );
    });
}