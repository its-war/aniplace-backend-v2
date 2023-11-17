const listarEpisodios = require('../../models/episodios/listar');
const {matchedData, validationResult} = require('express-validator');
module.exports = async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        let idAnime = matchedData(req).idAnime;
        let temporadas = (await listarEpisodios(idAnime)).temporadas;
        return res.send({temporadas: temporadas});
    } else {
        return res.send({temporadas: []});
    }
}