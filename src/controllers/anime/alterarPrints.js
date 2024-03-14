const { matchedData, validationResult } = require('express-validator');
const sharp = require('sharp');
const fs = require('fs');
const he = require('he');
const alterarAnime = require('../../models/animes/alterar');
module.exports = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send({ errors: errors.array() });
    }

    let {idAnime, manter, deletions} = (matchedData(req));
    const imageNames = [];

    if(manter){
        manter = manter.length === 0 ? [] : he.decode(typeof manter === 'object' ? manter.join('_') : manter).split('_');
    }else{
        manter = [];
    }
    if(deletions){
        deletions = deletions.length === 0 ? [] : he.decode(typeof deletions === 'object' ? deletions.join('_') : deletions).split('_');
    }else{
        deletions = [];
    }

    if(req.files){
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

        let dados;
        if(manter.length === 0 && imageNames.length === 0){
            dados = {
                prints: 'p'
            }
        }else{
            dados = {
                prints: [...manter, ...imageNames].join('_')
            }
        }
        const anime = await alterarAnime(idAnime, dados);
        for (let i = 0; i < deletions.length; i++) {
            if(fs.existsSync(`public/img/anime/print/${deletions[i]}`)){
                fs.unlinkSync(`public/img/anime/print/${deletions[i]}`);
            }
        }
        return res.send({ anime });
    }else{
        let dados = {
            prints: [...manter, ...imageNames].join('_')
        }
        const anime = await alterarAnime(idAnime, dados);
        for (let i = 0; i < deletions.length; i++) {
            if(fs.existsSync(`public/img/anime/print/${deletions[i]}`)){
                fs.unlinkSync(`public/img/anime/print/${deletions[i]}`);
            }
        }
        return res.send({ anime });
    }
}