const {matchedData, validationResult} = require('express-validator');
const hasDestaque = require('../../models/destaques/hasDestaque');
module.exports = async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        let idAnime = matchedData(req).idAnime;
        try {
            return res.send({hasDestaque: await hasDestaque(idAnime)});
        } catch {
            return res.send({hasDestaque: false});
        }
    } else {
        return res.send({hasDestaque: false});
    }
}