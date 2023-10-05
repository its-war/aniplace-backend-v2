const conn = require('../../config/database');
const he = require('he');
module.exports = async (idAnime, temporada, numero) => {
    try{
        let sql = `select a.idAnime, a.nome, a.capa, e.idEpisodio, e.linkOnline, e.acessos as visu, e.ova
                   from episodios e
                   inner join animes a on e.idAnime = a.idAnime
                   where e.idAnime=? and e.temporada=? and e.numero=?`;
        const [rows] = await conn.promise().query(sql, [idAnime, temporada, numero]);

        if(rows.length === 0){
            return false;
        }

        return {
            idEpisodio: rows[0].idEpisodio,
            temporada: parseInt(temporada),
            numero: parseInt(numero),
            linkOnline: he.decode(rows[0].linkOnline),
            ova: rows[0].ova === 1,
            acessos: rows[0].visu,
            anime: {
                idAnime: rows[0].idAnime,
                nome: rows[0].nome,
                capa: rows[0].capa
            },
            temporadas: await getTemporadas(idAnime)
        }
    }catch (e) {
        return false;
    }
}

async function getTemporadas(idAnime){
    try{
        const query = `
          SELECT temporada, COUNT(*) AS totalEpisodios
          FROM episodios
          WHERE idAnime = ?
          GROUP BY temporada
        `;
        const [rows] = await conn.promise().query(query, idAnime);

        if (rows.length === 0) {
            return [];
        }

        const temporadas = rows.map((row) => ({
            numeroTemporada: row.temporada,
            totalEpisodios: row.totalEpisodios
        }));

        for (const temporada of temporadas) {
            const acessosQuery = `
                SELECT acessos FROM episodios
                WHERE idAnime = ? AND temporada = ?
                ORDER BY numero
            `;
            const [acessosRows] = await conn.promise().query(acessosQuery, [idAnime, temporada.numeroTemporada]);

            temporada.acessos = acessosRows.map((acessoRow) => acessoRow.acessos);
        }

        return temporadas;
    }catch (e) {
        return [];
    }
}