const {matchedData, validationResult} = require('express-validator');
const captcha = require('../../plugins/captcha');
const salvarCaptcha = require('../../models/captcha/inserir');
const deletarCaptcha = require('../../models/captcha/deletar');
module.exports = async (req, res) => {
    const result = validationResult(req);
    if(result.isEmpty()){
        let idCaptcha = matchedData(req).idCaptcha;
        if(idCaptcha){
            deletarCaptcha(idCaptcha);
        }
    }

    let {text, svg} = captcha();

    let registro = Date.now();
    let ip = req.proxy(req, 'loopback');
    let id = await salvarCaptcha(ip, text, registro);

    return res.send({svg: svg, idCaptcha: id, registro: registro});
}