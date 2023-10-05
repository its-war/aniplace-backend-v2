const userLogin = require('../../models/user/login');
const getCaptchaData = require('../../models/captcha/getCaptchaData');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {matchedData, validationResult} = require('express-validator');
module.exports = async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        let dados = matchedData(req);
        dados.username = dados.username.toLowerCase();

        let captcha = await getCaptchaData(dados.idCaptcha, dados.texto);
        if(!captcha){
            return res.send({login: false, error: 'Captcha inválido.'});
        }
        let isValid = (Date.now() - parseInt(captcha.registro)) <= captcha.validade;
        if(!isValid){
            return res.send({login: false, error: 'Captcha inválido.'});
        }

        delete dados.idCaptcha;
        delete dados.texto;

        try {
            let login = await userLogin(dados.username);
            if (login && bcrypt.compareSync(dados.senha, login.senha)) {
                const token = jwt.sign({ id: login.idUser }, process.env.SERVERSECRET, { expiresIn: '5m' });
                const refreshToken = jwt.sign({ chave: login.chave }, process.env.SERVERSECRETREFRESH, { expiresIn: '30d' });
                let {idUser, nome, ranking, foto} = login;
                let user = {idUser, nome, ranking, foto};

                if(process.env.MODE === 'development'){
                    return res.header('authorization', token).send({login: true, userdata: refreshToken, tokenRouterVerify: token, userBasicData: user});
                }

                if(process.env.MODE === 'production'){
                    return res.cookie('token', token, {
                        //secure: true, // Envia apenas em conexões HTTPS
                        httpOnly: true, // Não permite acesso via JavaScript
                        sameSite: 'Lax', // Restringe o envio do cookie ao mesmo site ('Strict')
                        maxAge: 30 * 24 * 60 * 60 * 1000,
                        signed: true,
                        overwrite: true,
                        domain: '192.168.0.21'
                    }).json({ login: true, userdata: refreshToken, tokenRouterVerify: token, userBasicData: user });
                }
            }
            return res.send({ login: false, error: 'Usuário ou senha incorretos.' });
        } catch(error) {
            return res.send({ login: false, error: 'Erro no servidor, tente novamente mais tarde.' });
        }
    } else {
        return res.send({ error: result.array().toString(), login: false });
    }
}