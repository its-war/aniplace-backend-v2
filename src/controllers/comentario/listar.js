const listarComentarios = require('../../models/comentarios/listar');
const {matchedData, validationResult} = require('express-validator');
module.exports = async (req ,res) => {
    const result = validationResult(req);
    if(result.isEmpty()){
        let dados = matchedData(req);
        try{
            let comentarios = await listarComentarios(dados.tipo, dados.idOrigem, dados.ordem);
            return res.send({comentarios: comentarios});
        }catch(e){
            return res.send({comentarios: []});
        }
    }else{
        return res.send({comentarios: []});
    }
}