const conn = require('../../config/database');
module.exports = async (limite) => {
    if(typeof limite !== 'number'){
        limite = parseInt(limite);
    }
    return await getUltimosEpisodios(limite);
}

async function getUltimosEpisodios(limite){
    try{
        let query = `
            SELECT e.idEpisodio, e.numero, e.temporada, a.idAnime, a.nome AS nomeAnime, a.capa
            FROM episodios e
            INNER JOIN animes a ON e.idAnime = a.idAnime
            WHERE a.status = 1
            ORDER BY e.idEpisodio DESC
        `;

        if(limite > 0){
            query = query + ' LIMIT ' + limite;
        }

        const [rows] = await conn.promise().query(query);
        return rows.map((row) => ({
            idEpisodio: row.idEpisodio,
            numero: row.numero,
            temporada: row.temporada,
            anime: {
                idAnime: row.idAnime,
                nome: row.nomeAnime,
                capa: row.capa
            }
        }));
    }catch (e) {
        throw new Error('Erro ao carregar os episódios.');
    }
}