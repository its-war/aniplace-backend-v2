const alterarAnime = require('../../models/animes/alterar');
const {matchedData, validationResult} = require('express-validator');
module.exports = async (req, res) => {
    const result = validationResult(req);
    if(result.isEmpty()){
        let campos = matchedData(req);
        let id = campos.id;
        if(campos.sinopse){
            campos.sinopse = JSON.stringify(campos.sinopse);
        }
        delete campos.id;
        if(Object.keys(campos).length > 0){
            return res.send(await alterarAnime(id, campos));
        }else{
            return res.send({errors: ['Nenhum campo foi fornecido para alteração.']});
        }
    }

    return res.send({ errors: result.array() });
}
