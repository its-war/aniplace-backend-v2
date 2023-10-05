const getMaisAcessados = require('../../models/animes/getAnimesMaisAcessados')
module.exports = async (req, res) => {
    try{
        let campos = [
            'idAnime',
            'nome',
            'capa'
        ];
        let animes = await getMaisAcessados(25, campos);
        return res.send({animes: animes});
    }catch{
        return res.send({animes: []});
    }
}