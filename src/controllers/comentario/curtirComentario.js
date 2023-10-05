const curtir = require('../../models/comentarios/curtirComentario');
const hasCurtir = require('../../models/comentarios/hasCurtirComentario');
const descurtir = require('../../models/comentarios/descurtirComentario');
const {matchedData, validationResult} = require('express-validator');
module.exports = async (req, res) => {
    const result = validationResult(req);
    if(result.isEmpty()){
        let dados = matchedData(req);
        try{
            let hasCurtida = await hasCurtir(dados.idComentario, req.iduser);
            if(hasCurtida){
                let descurtiu = await descurtir(dados.idComentario, req.iduser);
                if(descurtiu){
                    return res.send({erro: false, curtir: false});
                }else{
                    return res.send({erro: true, curtir: false});
                }
            }else{
                let curtiu = await curtir(dados.idComentario, req.iduser);
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