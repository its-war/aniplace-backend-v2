const {matchedData, validationResult} = require('express-validator');
const getPostagens = require("../../models/postagens/listar");
module.exports = async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        try {
            let {postagens, totalPaginas} = await getPostagens(matchedData(req).pagina ?? 1, matchedData(req).idUser ?? 0);
            return res.send({ postagens: postagens, totalPaginas: totalPaginas });
        } catch {
            return res.send({ postagens: [], totalPaginas: 0 });
        }
    } else {
        return res.send({ postagens: [], totalPaginas: 0 });
    }
}