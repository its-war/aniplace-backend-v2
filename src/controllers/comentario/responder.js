const responder = require('../../models/comentarios/responder');
const {matchedData, validationResult} = require('express-validator');
module.exports = async (req, res) => {
    const result = validationResult(req);
    if(result.isEmpty()){
        let dados = matchedData(req);
        try{
            let resposta = await responder(dados.texto, dados.idComentario, req.iduser);
            return res.send({resposta: resposta});
        }catch{
            return res.send({resposta: false});
        }
    }else{
        return res.send({resposta: false});
    }
}