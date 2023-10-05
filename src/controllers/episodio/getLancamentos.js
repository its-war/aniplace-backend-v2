const getLancamentos = require('../../models/episodios/getLancamentos');
const {matchedData, validationResult} = require('express-validator');
module.exports = async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        try {
            let {episodios, total} = await getLancamentos(
                matchedData(req).limite ?? 16,
                matchedData(req).pagina ?? 1
            );
            return res.send({episodios: episodios, total: total});
        } catch {
            return res.send({episodios: []});
        }
    } else {
        return res.send({episodios: []});
    }
}