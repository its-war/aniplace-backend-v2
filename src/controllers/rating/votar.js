const {matchedData, validationResult} = require('express-validator');
const votar = require('../../models/rating/votar');
const mudarVoto = require('../../models/rating/mudarVoto');
const verificar = require('../../models/rating/verificar');
module.exports = async (req, res) => {
    let errors = validationResult(req);
    if(errors.isEmpty()){
        let dados = matchedData(req);
        try{
            let hasVoto = await verificar(dados.idAnime, req.iduser);
            if(hasVoto){
                let success = mudarVoto(dados.idAnime, req.iduser, dados.nota);
                return res.send({voto: success});
            }else{
                let success = await votar(dados.idAnime, req.iduser, dados.nota);
                return res.send({voto: success});
            }
        }catch{
            return res.send({voto: false});
        }
    }else{
        return res.send({errors: errors.array(), voto: false});
    }
}