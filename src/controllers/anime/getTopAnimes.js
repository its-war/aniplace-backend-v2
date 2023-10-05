const getTopAnimes = require('../../models/rating/getTopAnimes');
const {matchedData, validationResult} = require('express-validator');
module.exports = async (req, res) => {
    const result = validationResult(req);
    if(result.isEmpty()){
        let limite = matchedData(req).limite ?? 10;
        if(typeof limite === 'string'){
            limite = parseInt(limite);
        }
        try{
            let animes = await getTopAnimes(limite);
            return res.send({animes: animes});
        }catch{
            return res.send({animes: []})
        }
    }else{
        return res.send({animes: [], errors: result.array()});
    }
}