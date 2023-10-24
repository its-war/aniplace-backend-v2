const updateUser = require('../../models/user/updateUser');
const getFieldUser = require('../../models/user/getFieldUser');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
module.exports = async (req, res) => {
    try {
        if(req.files && req.files['foto']){
            const tempPath = req.files['foto'][0].path;
            const novoNome = gerarNomeAleatorio();
            const destino = path.join('public/img/user/foto', novoNome);

            let user = await getFieldUser(req.iduser, 'idUser, foto');
            let imgAntiga = path.join('public/img/user/foto', user.foto);
            if(fs.existsSync(imgAntiga)){
                fs.unlinkSync(imgAntiga);
            }

            await sharp(tempPath)
                .resize({ width: 300, height: 300, fit: "cover", position: 'center' })
                .jpeg({ quality: 50 })
                .toFile(destino)
                .then(() => {
                    // Após o processamento, libere o arquivo da memória
                    sharp.cache(false);
                })
                .catch(() => {
                    return res.send({foto: false});
                });
            if (fs.existsSync(tempPath)) {
                fs.unlinkSync(tempPath);
            }
            let alterou = await updateUser(req.iduser, {foto: novoNome});
            return res.send({foto: alterou ? novoNome : false});
        }else{
            return res.send({foto: false});
        }
    } catch(e) {
        console.log(e);
        return res.send({foto: false});
    }
}

function gerarNomeAleatorio() {
    const prefixo = 'user';
    const timestamp = Date.now();
    const numeroAleatorio = Math.floor(Math.random() * 10000000000000);
    const extensao = 'jpg';

    return `${prefixo}-${timestamp}-${numeroAleatorio}.${extensao}`;
}