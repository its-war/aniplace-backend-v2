const curtir = require('../../models/comentarios/curtirResposta');
const hasCurtir = require('../../models/comentarios/hasCurtirResposta');
const descurtir = require('../../models/comentarios/descurtirResposta');
const {matchedData, validationResult} = require('express-validator');
module.exports = async (req, res) => {
    const result = validationResult(req);
    if(result.isEmpty()){
        let dados = matchedData(req);
        try{
            let hasCurtida = await hasCurtir(dados.idResposta, req.iduser);
            if(hasCurtida){
                let descurtiu = await descurtir(dados.idResposta, req.iduser);
                if(descurtiu){
                    return res.send({erro: false, curtir: false});
                }else{
                    return res.send({erro: true, curtir: false});
                }
            }else{
                let curtiu = await curtir(dados.idResposta, req.iduser);
                if(curtiu){
                    return res.send({erro: false, curtir: true});
                }else{
                    return res.send({erro: true, curtir: false});
                }
            }
        }catch{
            return res.send({erro: true, curtir: false});
        }
    }else{
        return res.send({erro: true, curtir: false});
    }
}