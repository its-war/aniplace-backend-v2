const alterarFoto = require('../../models/animes/alterarFoto');
const {matchedData, validationResult} = require('express-validator');
const sharp = require('sharp');
const fs = require('fs');
module.exports = async (req, res) => {
    const result = validationResult(req);
    if(result.isEmpty()){
        const dados = matchedData(req);
        const tempPath = req.file.path;
        const campo = dados.opcao === 1 ? 'foto' : 'capa';
        let novoNome = gerarNomeAleatorio(campo);
        const destino = 'public/img/anime/'+ campo +'/' + novoNome;
        const dimension = dados.opcao === 1 ? { width: 900, height: 1280 } : { width: 1920, height: 1080 } // Dimensões para a imagem "foto"

        const newImg = sharp(tempPath)
            .resize(dimension.width, dimension.height)
            .toFormat('jpeg')
            .toFile(destino)
            .then(() => {
                sharp.cache(false);
            });

        await Promise.all([newImg]).then(async () => {
            novoNome = destino.split('/')[4];
            fs.unlinkSync(tempPath);
            let imgAntiga = await alterarFoto(novoNome, campo, dados.id);
            if(imgAntiga){
                fs.unlinkSync('public/img/anime/'+ campo + '/' + imgAntiga);
                return res.send({upload: true});
            }else{
                fs.unlinkSync('public/img/anime/' + campo + '/' + novoNome);
                return res.send({upload: false});
            }
        }).catch(() => {
            return res.send({upload: false});
        });
    }else{
        return res.send({ errors: result.array(), upload: false });
    }
}

function gerarNomeAleatorio(tipo) {
    const prefixo = tipo === 'foto' ? 'anime-foto' : 'anime-capa';
    const timestamp = Date.now();
    const numeroAleatorio = Math.floor(Math.random() * 10000000000000);
    const extensao = 'jpg';

    return `${prefixo}-${timestamp}-${numeroAleatorio}.${extensao}`;
}