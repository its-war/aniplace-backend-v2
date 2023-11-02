const {matchedData, validationResult} = require('express-validator');
const updateUser = require('../../models/user/updateUser');
const getFieldUser = require('../../models/user/getFieldUser');
const he = require('he');
const bcrypt = require('bcryptjs');
module.exports = async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        let dados = matchedData(req);
        try {
            //verificação de senha do usuario
            let user = await getFieldUser(req.iduser, 'idUser, senha');
            if(!bcrypt.compareSync(dados.senha, user.senha)){
                return res.send({user: false, msg: 'Senha inválida.'});
            }
            delete dados.senha; //campo senha deve ser deletado para não alterar a senha criptografada no banco

            if(dados.novaSenha){//caso  o usuário tenha informado uma nova senha
                dados.senha = bcrypt.hashSync(dados.senha, bcrypt.genSaltSync(10));//criptografamos a nova senha
                delete dados.novaSenha;//campo novaSenha deve ser deletado para não conflitar com o campo senha
            }

            if(dados.pronome){
                dados.pronome = he.decode(dados.pronome);
            }

            if(parseInt(dados.animeFavorito) === 0){
                dados.animeFavorito = null;
            }

            if (dados.nascimento) {//caso  o usuário tenha informado uma data, mudamos para o padrão aceito no MySQL
                dados.nascimento = he.decode(dados.nascimento).split('/').reverse().join('/');
                dados.nascimento = new Date(dados.nascimento);
            }

            let update = await updateUser(req.iduser, dados);
            return res.send({user: update});
        } catch(e) {
            return res.send({user: false, msg: 'Erro ao salvar os dados.'});
        }
    } else {
        return res.send({user: false, msg: 'Os campos não correspondem aos requisitos.'});
    }
}