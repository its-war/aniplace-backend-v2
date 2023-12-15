const hasTemporada = require('../../models/episodios/hasTemporada');
const getTemporadas = require('../../models/episodios/getTemporadas');
const {matchedData, validationResult} = require('express-validator');
module.exports = async (req, res) => {
    let result = validationResult(req);
    if(result.isEmpty()){
        try{
            let idAnime = matchedData(req).idAnime;
            let tipo = matchedData(req).tipo ?? 1;
            if(typeof tipo !== 'number'){
                tipo = parseInt(tipo);
            }

            let numeroTemporadas;

            if(tipo === 2){
                numeroTemporadas = await getTemporadas(idAnime);
            }else{
                numeroTemporadas = await hasTemporada(idAnime);
            }

            return res.send({numeroTemporadas: numeroTemporadas});
        }catch{
            return res.send({numeroTemporadas: 0});
        }
    }else{
        return res.send({numeroTemporadas: 0});
    }
}