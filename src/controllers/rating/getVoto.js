const getVoto = require('../../models/rating/getVoto');
const {matchedData, validationResult} = require('express-validator');
module.exports = async (req, res) => {
    const result = validationResult(req);
    if(result.isEmpty()){
        let idAnime = matchedData(req).idAnime;
        try{
            let nota = await getVoto(idAnime, req.iduser);
            return res.send({nota: nota});
        }catch{
            return res.send({nota: null})
        }
    }else{
        return res.send({errors: result.array(), nota: null});
    }
}