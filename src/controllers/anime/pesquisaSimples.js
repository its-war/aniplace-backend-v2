const pesquisaSimples = require('../../models/animes/pesquisaSimples');
const listarGeneros = require('../../models/animes/listarGeneros');
const {matchedData, validationResult} = require('express-validator');
module.exports = async (req, res) => {
    let errors = validationResult(req);
    if(errors.isEmpty()){
        let {texto, pagina} = matchedData(req);
        let {animes, total} = await pesquisaSimples(texto, pagina);
        for(let i = 0; i < animes.length; i++){
            animes[i].generos = await listarGeneros(animes[i].generos);
        }
        return res.send({animes: animes, total: total});
    }else{
        return res.send({errors: errors.array()});
    }
}