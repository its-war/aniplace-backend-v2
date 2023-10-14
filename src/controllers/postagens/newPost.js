const {matchedData, validationResult} = require('express-validator');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const salvarPost = require('../../models/postagens/inserir');
module.exports = async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        let texto = matchedData(req).texto ?? null;
        let imagem = null;
        let idPost = null;
        try {
            if(req.files && req.files['imagem']){
                const tempPath = req.files['imagem'][0].path;
                const newNome = gerarNomeAleatorio();
                const destino = path.join('public/img/post', newNome);

                await sharp(tempPath)
                    .resize({ width: 800, withoutEnlargement: true })
                    .jpeg({ quality: 60 })
                    .toFile(destino)
                    .then(() => {
                        // Após o processamento, libere o arquivo da memória
                        sharp.cache(false);
                    })
                    .catch(() => {
                        return res.send({post: false});
                    });

                idPost = await salvarPost(texto, newNome, req.iduser);
                if (fs.existsSync(tempPath)) {
                    fs.unlinkSync(tempPath);
                }
                imagem = newNome;
            }else{
                if(texto){
                    idPost = await salvarPost(texto, null, req.iduser);
                }else{
                    return res.send({post: false});
                }
            }
            let data = new Date();
            return res.send({post: {idPostagem: idPost, texto: texto, imagem: imagem, registro: data.toISOString()}});
        } catch {
            return res.send({post: false});
        }
    } else {
        return res.send({post: false});
    }
}

function gerarNomeAleatorio() {
    const prefixo = 'post';
    const timestamp = Date.now();
    const numeroAleatorio = Math.floor(Math.random() * 10000000000000);
    const extensao = 'jpg';

    return `${prefixo}-${timestamp}-${numeroAleatorio}.${extensao}`;
}