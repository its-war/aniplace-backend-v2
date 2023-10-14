const {matchedData, validationResult} = require('express-validator');
const deletar = require('../../models/postagens/deletar');
const deletarComentarios = require('../../models/comentarios/deletarComentarios');
const getById = require('../../models/postagens/getById');
const fs = require('fs');
const path = require('path');
module.exports = async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        let idPostagem = matchedData(req).idPostagem;
        try {
            let post = await getById(idPostagem);
            let deletou = await deletar(idPostagem, req.iduser);
            if(deletou){
                if(post.imagem){
                    let caminhoImagem = path.join('public/img/post', post.imagem);
                    if (fs.existsSync(caminhoImagem)) {
                        fs.unlinkSync(caminhoImagem);
                    }
                }
                await deletarComentarios(idPostagem, 3);
                return res.send({deletou: deletou});
            }
        } catch {
            return res.send({deletou: false});
        }
    } else {
        return res.send({deletou: false});
    }
}