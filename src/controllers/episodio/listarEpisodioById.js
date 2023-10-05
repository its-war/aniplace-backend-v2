const listarById = require('../../models/episodios/listarById');
const {matchedData, validationResult} = require('express-validator');
const he = require('he');
module.exports = async (req, res) => {
    const result = validationResult(req);
    if(result.isEmpty()){
        let dados = matchedData(req);
        try{
            let episodio = await listarById(dados.idAnime, dados.numero, dados.temporada);
            episodio.linkOnline = he.decode(episodio.linkOnline);
            episodio.link1080p = he.decode(episodio.link1080p);
            episodio.link720p = he.decode(episodio.link720p);
            episodio.ova = episodio.ova === 1;
            return res.send({episodio: episodio});
        }catch{
            return res.send({episodio: null});
        }
    }else{
        return res.send({episodio: null});
    }
}