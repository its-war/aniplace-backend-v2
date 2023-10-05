const getUltimos = require('../../models/episodios/getUltimosEpisodios');
const {matchedData, validationResult} = require('express-validator');
module.exports = async (req, res) => {
    const result = validationResult(req);
    if(result.isEmpty()){
        try{
            let episodios = await getUltimos(matchedData(req).limite ?? 0);
            return res.send({episodios: episodios});
        }catch(e){
            return res.send({episodios: []});
        }
    }else{
        return res.send({episodios: []});
    }
}