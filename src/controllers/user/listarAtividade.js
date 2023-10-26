const {matchedData, validationResult} = require('express-validator');
const listarByUser = require('../../models/atividade/listarByUser');
module.exports = async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        try {
            let animes = await listarByUser(matchedData(req).idUser);
            return res.send({animes: animes});
        } catch {
            return res.send({animes: []});
        }
    } else {
        return res.send({animes: []});
    }
}