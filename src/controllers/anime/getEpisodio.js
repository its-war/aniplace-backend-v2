const getEpisodio = require('../../models/episodios/getEpisodio');
const incrementarAnimeAcessos = require('../../models/animes/incrementarAcesso');
const incrementarEpisodioAcessos = require('../../models/episodios/incrementarAcessos');
const {matchedData, validationResult} = require('express-validator');
module.exports = async (req, res) => {
    const errors = validationResult(req);
    if(errors.isEmpty()){
        let {idAnime, temporada, numero} = matchedData(req);

        let episodio = await getEpisodio(idAnime, temporada, numero);
        episodio.linkOnline = episodio.linkOnline.split('/d/')[1];
        episodio.linkOnline = episodio.linkOnline.split('/')[0];
        episodio.linkOnline = 'https://drive.google.com/file/d/' + episodio.linkOnline + '/preview';

        incrementarAnimeAcessos(idAnime);
        incrementarEpisodioAcessos(idAnime, numero, temporada);

        return res.send({episodio: episodio});
    }

    return res.send({errors: errors.array()});
}