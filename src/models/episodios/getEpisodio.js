const conn = require('../../config/database');
const he = require('he');
module.exports = async (idAnime, temporada, numero) => {
    try{
        let sql = `select a.idAnime, a.nome, a.capa, e.idEpisodio, e.linkOnline, e.acessos as visu, e.ova, e.duplo
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
            temporadas: await getTemporadas(idAnime),
            duplo: rows[0].duplo
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
            const getEpisodiosQuery = `
                SELECT acessos, duplo, numero, idEpisodio, ova FROM episodios
                WHERE idAnime = ? AND temporada = ?
                ORDER BY numero
            `;
            const [rowsEpisodios] = await conn.promise().query(getEpisodiosQuery, [idAnime, temporada.numeroTemporada]);

            temporada.episodios = rowsEpisodios.map((epRow) => ({
                idEpisodio: epRow.idEpisodio,
                acessos: epRow.acessos,
                duplo: epRow.duplo,
                numero: epRow.numero,
                ova: epRow.ova
            }));
        }

        return temporadas;
    }catch (e) {
        return [];
    }
}