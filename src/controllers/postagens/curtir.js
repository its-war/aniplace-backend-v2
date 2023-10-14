const {matchedData, validationResult} = require('express-validator');
const hasCurtida = require('../../models/postagens/hasCurtida');
const curtir = require('../../models/postagens/inserirCurtida');
const descurtir = require('../../models/postagens/descurtir');
module.exports = async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        let idPostagem = matchedData(req).idPostagem;
        try {
            let existsCurtida = await hasCurtida(idPostagem, req.iduser);
            if(existsCurtida){
                return res.send({erro: false, curtiu: await descurtir(idPostagem, req.iduser)});
            }else{
                return res.send({erro: false, curtiu: await curtir(idPostagem, req.iduser)});
            }
        } catch {
            return res.send({erro: true, curtiu: false});
        }
    } else {
        return res.send({erro: true, curtiu: false});
    }
}