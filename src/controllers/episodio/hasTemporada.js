const hasTemporada = require('../../models/episodios/hasTemporada');
const {matchedData, validationResult} = require('express-validator');
module.exports = async (req, res) => {
    let result = validationResult(req);
    if(result.isEmpty()){
        try{
            let idAnime = matchedData(req).idAnime;
            let numeroTemporadas = await hasTemporada(idAnime);
            return res.send({numeroTemporadas: numeroTemporadas});
        }catch{
            return res.send({numeroTemporadas: 0});
        }
    }else{
        return res.send({numeroTemporadas: 0});
    }
}