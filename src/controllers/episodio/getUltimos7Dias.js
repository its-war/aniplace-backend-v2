const getUltimos = require('../../models/episodios/getUltimosEpisodios');
const {matchedData, validationResult} = require('express-validator');
const NodeCache = require( "node-cache" );
const cache = new NodeCache({stdTTL: 30 * 60, checkperiod: 31 * 60});
module.exports = async (req, res) => {
    if(cache.has('getUltimos7Dias')){
        return res.send({episodios: cache.get('getUltimos7Dias')});
    }else{
        const result = validationResult(req);
        if(result.isEmpty()){
            try{
                let episodios = await getUltimos(matchedData(req).limite ?? 0);
                cache.set('getUltimos7Dias', episodios, 10 * 60);
                return res.send({episodios: episodios});
            }catch(e){
                return res.send({episodios: []});
            }
        }else{
            return res.send({episodios: []});
        }
    }
}