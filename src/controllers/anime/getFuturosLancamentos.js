const {matchedData, validationResult} = require('express-validator');
const getFuturosLancamentos = require('../../models/animes/getFuturosLancamentos');
const NodeCache = require( "node-cache" );
const cache = new NodeCache({stdTTL: 30 * 60, checkperiod: 31 * 60});
module.exports = async (req, res) => {
    if(cache.has('getFuturosLancamentos')){
        return res.send({futurosLancamentos: cache.get('getFuturosLancamentos')});
    }else{
        const result = validationResult(req);
        if (result.isEmpty()) {
            let limite = matchedData(req).limite;
            try {
                let lancamentos = await getFuturosLancamentos(limite ?? 0);
                cache.set('getFuturosLancamentos', lancamentos, 10 * 60);
                return res.send({futurosLancamentos: lancamentos});
            } catch {
                return res.send({futurosLancamentos: []});
            }
        } else {
            return res.send({futurosLancamentos: []});
        }
    }
}