const {matchedData, validationResult} = require('express-validator');
const salvarEpisodio = require('../../models/episodios/inserir');
module.exports = async (req, res) => {
    const result = validationResult(req);
    if(result.isEmpty()){
        let dados = matchedData(req);
        try{
            const timestamp = Date.now(); // Obtém o timestamp em milissegundos
            const dataAdicao = new Date(timestamp); // Cria um objeto Date com o timestamp

            // Extrai a parte da data no formato "YYYY-MM-DD"
            dados.registro = dataAdicao.toISOString().slice(0, 10);

            dados.ova = dados.ova ? 1 : 0;

            let idEpisodio = await salvarEpisodio(dados);
            if(idEpisodio){
                return res.send({cadastro: true, idEpisodio: idEpisodio});
            }
        }catch (error) {
            return res.send({cadastro: false});
        }
    }
    return res.send({cadastro: false, errors: result.array()});
}