const salvarComentario = require('../../models/comentarios/inserir');
const {matchedData, validationResult} = require('express-validator');
module.exports = async (req, res) => {
    const result = validationResult(req);
    if(result.isEmpty()){
        let dados = matchedData(req);
        try{
            let comment = await salvarComentario(dados.texto, dados.tipo, dados.idOrigem, dados.idUser);
            return res.send({comentario: comment});
        }catch{
            return res.send({comentario: false});
        }
    }else{
        return res.send({comentario: false});
    }
}