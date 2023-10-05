const {matchedData, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const cadastrarUser = require('../../models/user/inserir');
const getCaptchaData = require('../../models/captcha/getCaptchaData');
const jwt = require('jsonwebtoken');
module.exports = async (req, res) => {
    const result = validationResult(req);
    if(result.isEmpty()){
        let dados = matchedData(req);

        let captcha = await getCaptchaData(dados.idCaptcha, dados.texto);
        if(!captcha){
            return res.send({cadastro: false, error: 'Captcha inválido.'});
        }
        let isValid = (Date.now() - parseInt(captcha.registro)) <= captcha.validade;
        if(!isValid){
            return res.send({cadastro: false, error: 'Captcha inválido.'});
        }

        delete dados.idCaptcha;
        delete dados.texto;

        let words = dados.nome.split(' ');
        let capitalizedWords = [];

        for (let word of words) {
            let firstLetter = word.charAt(0).toUpperCase();
            let restOfWord = word.slice(1).toLowerCase();
            let capitalizedWord = firstLetter + restOfWord;
            capitalizedWords.push(capitalizedWord);
        }

        if(capitalizedWords.length < 2){
            return res.send({cadastro: false, error: 'Necessário pelo menos um nome e um sobrenome.'});
        }

        dados.nome = capitalizedWords.join(' ');

        dados.username = dados.username.toLowerCase();

        let sal = bcrypt.genSaltSync(10);
        dados.senha = bcrypt.hashSync(dados.senha, sal);

        const timestamp = Date.now();
        const numeroAleatorio = Math.floor(Math.random() * 10000000000000);
        const numeroAleatorio2 = Math.floor(Math.random() * 10000000000000);

        sal = bcrypt.genSaltSync(10);
        dados.chave = bcrypt.hashSync(timestamp + " " + numeroAleatorio + " " + numeroAleatorio2, sal);

        sal = bcrypt.genSaltSync(10);
        dados.masterkey = bcrypt.hashSync(timestamp + ' ' + numeroAleatorio + ' ' + dados.chave + dados.senha, sal);

        try{
            let cadastro = await cadastrarUser(dados);
            if(cadastro.success){

                const token = jwt.sign({ id: cadastro.idUser }, process.env.SERVERSECRET, { expiresIn: '5m' });
                const refreshToken = jwt.sign({ chave: dados.chave }, process.env.SERVERSECRETREFRESH, { expiresIn: '30d' });
                let user = {idUser: cadastro.idUser, nome: dados.nome, ranking: 0, foto: null};

                if(process.env.MODE === 'development'){
                    return res.header('authorization', token).send({cadastro: true, userdata: refreshToken, tokenRouterVerify: token, userBasicData: user});
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
                    }).json({ cadastro: true, userdata: refreshToken, tokenRouterVerify: token, userBasicData: user });
                }

                return res.send({cadastro: true});
            }else{
                return res.send({cadastro: false, error: 'Erro ao cadastrar. Tente de novo.'});
            }
        }catch(e){
            return res.send({cadastro: false, error: 'Erro no servidor. Tente novamente mais tarde.'});
        }
    }else{
        return res.send({error: result.array(), cadastro: false});
    }
}