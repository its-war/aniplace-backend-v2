const getMaisAcessados = require('../../models/animes/getAnimesMaisAcessados');
const NodeCache = require( "node-cache" );
const cache = new NodeCache({stdTTL: 30 * 60, checkperiod: 31 * 60});
module.exports = async (req, res) => {
    if(cache.has('getMaisAcessados')){
        return res.send({animes: cache.get('getMaisAcessados')});
    }else{
        try{
            let campos = [
                'idAnime',
                'nome',
                'capa'
            ];
            let animes = await getMaisAcessados(25, campos);
            cache.set('getMaisAcessados', animes, 20 * 60);
            return res.send({animes: animes});
        }catch{
            return res.send({animes: []});
        }
    }
}