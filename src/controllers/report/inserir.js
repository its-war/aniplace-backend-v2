const {matchedData, validationResult} = require('express-validator');
const reportar = require('../../models/report/inserir');
module.exports = async (req, res) => {
    let result = validationResult(req);
    if(result.isEmpty()){
        let dados = matchedData(req);
        try{
            let idReport = await reportar(dados.idAnime, dados.idEpisodio);
            return res.send({report: true, idReport: idReport});
        }catch{
            return res.send({report: false});
        }
    }else{
        return res.send({errors: result.array(), report: false});
    }
}