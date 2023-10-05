const update = require('../../models/episodios/updateEpisodio');
const {matchedData, validationResult} = require('express-validator');
module.exports = async (req, res) => {
    const result = validationResult(req);
    if(result.isEmpty()){
        let dados = matchedData(req);
        try{
            let updated = await update(dados.idEpisodio, dados.link, dados.ova);
            return res.send({update: updated});
        }catch{
            return res.send({update: false});
        }
    }else{
        console.log(result.array());
        return res.send({update: false});
    }
}