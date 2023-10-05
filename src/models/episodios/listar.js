const conn = require('../../config/database');
const he = require('he');
module.exports = async (idAnime) => {
    return await listar(idAnime);
}

async function getTemporadas(idAnime){
    try{
        const [rows] = await conn.promise().query('select distinct temporada from episodios where idAnime=?', idAnime);
        return rows.map((row) => row.temporada);
    }catch (error) {
        console.log(error);
        throw new Error('Erro ao tentar carregar episódios.');
    }
}

async function getEpisodios(idAnime, temporada){
    try{
        const [rows] = await conn.promise().query('select idEpisodio, numero, linkOnline, link1080p, link720p from episodios where idAnime=? and temporada=?', [idAnime, temporada]);
        return rows;
    }catch (e) {
        throw new Error('Erro ao carregar episódios.');
    }
}

async function listar(idAnime){
    try{
        const temporadas = await getTemporadas(idAnime);

        const dadosDoAnime = {
            temporadas: []
        };

        for (const temporada of temporadas) {
            const episodios = await getEpisodios(idAnime, temporada);

            for(let i = 0; i < episodios.length; i++){
                episodios[i].linkOnline = he.decode(episodios[i].linkOnline);
                episodios[i].link1080p = he.decode(episodios[i].link1080p);
                episodios[i].link720p = he.decode(episodios[i].link720p);
            }

            const dadosTemporada = {
                numeroTemporada: temporada,
                episodios: episodios
            };

            dadosDoAnime.temporadas.push(dadosTemporada);
        }

        return dadosDoAnime;
    }catch (error) {
        throw new Error('Erro ao carregar episódios.');
    }
}