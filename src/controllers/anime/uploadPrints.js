const sharp = require('sharp');
const fs = require('fs');
const alterarAnime = require('../../models/animes/alterar');
const getAnime = require('../../models/animes/listar');
module.exports = async (req, res) => {
    if (!req.files) {
        return res.send({ upload: false, error: 'É necessário enviar pelo menos uma imagem.' });
    }

    try{
        const idAnime = req.query.idAnime;
        const imageNames = [];

        const imgPromises = req.files.map((file, i) => {
            const imgName = `p${i + 1}-a${idAnime}-${Date.now()}.jpg`;
            imageNames.push(imgName);
            return sharp(file.path)
                .resize(854, 480)
                .toFormat('jpeg')
                .toFile(`public/img/anime/print/${imgName}`)
                .then(() => {
                    sharp.cache(false);
                });
        });

        await Promise.all(imgPromises);

        req.files.forEach((file) => {
            fs.unlinkSync(file.path);
        });

        let anime = await getAnime(2, 1, idAnime);

        let result = null;

        if(anime[0].prints.length > 10){
            let prints = anime[0].prints + '_' + imageNames.join('_')
            result = await alterarAnime(idAnime, {prints: prints});
        }else{
            result = await alterarAnime(idAnime, {prints: imageNames.join('_')});
        }

        return res.send({upload: result.affectedRows > 0});
    }catch(error){
        return res.send({error: error});
    }
}