const getTopAnimes = require('../../models/rating/getTopAnimes');
const {matchedData, validationResult} = require('express-validator');
const NodeCache = require( "node-cache" );
const cache = new NodeCache({stdTTL: 30 * 60, checkperiod: 31 * 60});
module.exports = async (req, res) => {
    if(cache.has('getTopAnimes')){
        return res.send({animes: cache.get('getTopAnimes')});
    }else{
        const result = validationResult(req);
        if(result.isEmpty()){
            let limite = matchedData(req).limite ?? 10;
            if(typeof limite === 'string'){
                limite = parseInt(limite);
            }
            try{
                let animes = await getTopAnimes(limite);
                cache.set('getTopAnimes', animes, 60 * 60 * 12);
                return res.send({animes: animes});
            }catch{
                return res.send({animes: []})
            }
        }else{
            return res.send({animes: [], errors: result.array()});
        }
    }
}