const getAnimeNota = require('../../models/rating/getAnimeNota');
const {matchedData, validationResult} = require('express-validator');
module.exports = async (req, res) => {
    const result = validationResult(req);
    if(result.isEmpty()){
        let idAnime = matchedData(req).idAnime;
        try{
            let {nota, totalVotos} = await getAnimeNota(idAnime);
            return res.send({nota: nota, totalVotos: totalVotos});
        }catch{
            return res.send({nota: null});
        }
    }else{
        return res.send({nota: null, errors: result.array()});
    }
}