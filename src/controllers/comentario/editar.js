const editar = require('../../models/comentarios/editar');
const {matchedData, validationResult} = require('express-validator');
module.exports = async (req, res) => {
    const result = validationResult(req);
    if(result.isEmpty()){
        let dados = matchedData(req);
        try{
            let editou = await editar(
                dados.opcao === 1 ? 'comentarios' : 'respostas',
                dados.id,
                dados.texto,
                req.iduser
            );
            return res.send({editar: editou});
        }catch{
            return res.send({editar: false});
        }
    }else{
        return res.send({editar: false});
    }
}