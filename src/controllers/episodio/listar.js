const listarEpisodios = require('../../models/episodios/listar');
const {matchedData, validationResult} = require('express-validator');
module.exports = async (req, res) => {
    let idAnime = matchedData(req).idAnime;
    let temporadas = await listarEpisodios(idAnime);
    return res.send(temporadas);
}