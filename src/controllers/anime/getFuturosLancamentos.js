const {matchedData, validationResult} = require('express-validator');
const getFuturosLancamentos = require('../../models/animes/getFuturosLancamentos');
module.exports = async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        let limite = matchedData(req).limite;
        try {
            let lancamentos = await getFuturosLancamentos(limite ?? 0);
            return res.send({futurosLancamentos: lancamentos});
        } catch {
            return res.send({futurosLancamentos: []});
        }
    } else {
        return res.send({futurosLancamentos: []});
    }
}