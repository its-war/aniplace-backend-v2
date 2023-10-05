const getEpisodiosInfo = require('../../models/episodios/getEpisodiosInfo');
module.exports = async (req, res) => {
    try{
        let dados = await getEpisodiosInfo();
        return res.send({media: parseFloat(dados.media).toFixed(2), totalEpisodios: dados.totalEpisodios});
    }catch{
        return res.send({media: 0.0, totalEpisodios: 0});
    }
}