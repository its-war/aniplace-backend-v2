const animeInserir = require('../../models/animes/inserir');
const {matchedData, validationResult} = require('express-validator');
const sharp = require('sharp');
const fs = require('fs');
module.exports = async (req, res) => {
    const result = validationResult(req);
    if(result.isEmpty()){
        try{
            let anime = matchedData(req);
            const tempPaths = [req.files['foto'][0].path, req.files['capa'][0].path];
            const nomesAleatorios = tempPaths.map((_, index) => gerarNomeAleatorio(index === 0 ? 'foto' : 'capa'));
            const destinationPaths = nomesAleatorios.map((nome, index) => `public/img/anime/${index === 0 ? 'foto' : 'capa'}/${nome}`);
            const imageDimensions = [
                { width: 900, height: 1280 }, // Dimensões para a imagem "foto"
                { width: 1920, height: 1080 }, // Dimensões para a imagem "capa"
            ];

            const resizePromises = tempPaths.map((tempPath, index) => {
                return sharp(tempPath)
                    .resize(imageDimensions[index].width, imageDimensions[index].height)
                    .toFormat('jpeg')
                    .toFile(destinationPaths[index])
                    .then(() => {
                        // Após o processamento, libere o arquivo da memória
                        sharp.cache(false);
                    });
            });

            await Promise.all(resizePromises).then(async () => {
                const imageNames = destinationPaths.map((path) => path.split('/')[4]);
                anime.foto = imageNames[0];
                anime.capa = imageNames[1];
                let idCadastrado = await animeInserir(anime);
                tempPaths.forEach((tempPath) => fs.unlinkSync(tempPath));
                return res.send({idCadastrado: idCadastrado});
            }).catch((errors) => {
                return res.status(500).json({ msg: 'Erro ao redimensionar as imagens' });
            });
        }catch{
            return res.status(500).json({ msg: 'Erro ao redimensionar as imagens' });
        }
    }else{
        return res.send({ errors: result.array() });
    }
}

function gerarNomeAleatorio(tipo) {
    const prefixo = tipo === 'foto' ? 'anime-foto' : 'anime-capa';
    const timestamp = Date.now();
    const numeroAleatorio = Math.floor(Math.random() * 10000000000000);
    const extensao = 'jpg';

    return `${prefixo}-${timestamp}-${numeroAleatorio}.${extensao}`;
}