const {matchedData, validationResult} = require('express-validator');
const salvarEpisodios = require('../../models/episodios/inserirMultiEpisodios');
module.exports = async (req, res) => {
    const result = validationResult(req);
    if(result.isEmpty()){
        let dados = matchedData(req);

        dados.linksOnline = dados.linksOnline.split('\n');
        dados.links1080p = dados.links1080p.split('\n');
        dados.links720p = dados.links720p.split('\n');

        let episodios = [];

        const timestamp = Date.now(); // Obtém o timestamp em milissegundos
        const dataAdicao = new Date(timestamp); // Cria um objeto Date com o timestamp

        // Extrai a parte da data no formato "YYYY-MM-DD"
        let registro = dataAdicao.toISOString().slice(0, 10);

        for(let i = 0; i < dados.linksOnline.length; i++){
            episodios.push({
                numero: i + 1,
                linkOnline: dados.linksOnline[i],
                link1080p: dados.links1080p[i],
                link720p: dados.links720p[i],
                registro: registro
            });
        }

        return res.send({cadastro: await salvarEpisodios(episodios, dados.temporada, dados.idAnime)});
    }else{
        return res.send({errors: result.array()});
    }
}