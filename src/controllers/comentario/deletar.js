const deletar = require('../../models/comentarios/deletar');
const {matchedData, validationResult} = require('express-validator');
module.exports = async (req, res) => {
    const result = validationResult(req);
    if(result.isEmpty()){
        let dados = matchedData(req);
        try{
            let deletou = await deletar(
                dados.opcao === 1 ? 'comentarios' : 'respostas',
                dados.id,
                req.iduser
            );
            return res.send({delete: deletou});
        }catch{
            return res.send({delete: false});
        }
    }else{
        return res.send({delete: false});
    }
}