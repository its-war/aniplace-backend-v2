const getPublicPerfil = require('../../models/user/getPublicPerfil');
const {matchedData, validationResult} = require('express-validator');
module.exports = async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        try {
            let user = await getPublicPerfil(matchedData(req).idUser);
            return res.send({user: user});
        } catch {
            return res.send({user: null});
        }
    } else {
        return res.send({user: null});
    }
}