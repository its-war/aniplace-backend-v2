const listarRespostas = require('../../models/comentarios/listarRespostas');
const {matchedData, validationResult} = require('express-validator');
module.exports = async (req ,res) => {
    const result = validationResult(req);
    if(result.isEmpty()){
        let dados = matchedData(req);
        try{
            let respostas = await listarRespostas(dados.idComentario);
            return res.send({respostas: respostas});
        }catch(e){
            return res.send({respostas: []});
        }
    }else{
        return res.send({respostas: []});
    }
}