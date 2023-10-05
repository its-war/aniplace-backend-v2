const {matchedData, validationResult} = require('express-validator');
const salvarDestaque = require('../../models/destaques/inserir');
module.exports = async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        let {idAnime, numero} = matchedData(req);
        try {
            let salvou = await salvarDestaque({idAnime: idAnime, numero: numero});
            return res.send({destaque: salvou});
        } catch {
            return res.send({destaque: false});
        }
    } else {
        return res.send({destaque: false});
    }
}