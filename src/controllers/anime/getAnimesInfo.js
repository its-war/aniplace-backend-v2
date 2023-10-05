const getAnimesInfo = require('../../models/animes/getAnimesInfo');
module.exports = async (req, res) => {
    try{
        let dados = await getAnimesInfo();
        return res.send({totalAnimes: dados.totalAnimes, animesCompletos: dados.animesCompletos, animesLancamento: dados.animesLancamento});
    }catch{
        return res.send({totalAnimes: 0, animesCompletos: 0, animesLancamento: 0});
    }
}