const getUserField = require('../../models/user/getFieldUser');
const updateUser = require('../../models/user/updateUser');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
module.exports = async (req, res) => {
    try {
        if(req.files && req.files['capa']){
            const tempPath = req.files['capa'][0].path;
            const novoNome = gerarNomeAleatorio();
            const destino = path.join('public/img/user/capa', novoNome);

            let user = await getUserField(req.iduser, 'idUser, capa');
            if(user.capa){
                let imgAntiga = path.join('public/img/user/capa', user.capa);
                if(fs.existsSync(imgAntiga)){
                    fs.unlinkSync(imgAntiga);
                }
            }

            await sharp(tempPath)
                .resize({ width: 1422, height: 800, fit: "cover", position: 'center' })
                .jpeg({ quality: 80 })
                .toFile(destino)
                .then(() => {
                    // Após o processamento, libere o arquivo da memória
                    sharp.cache(false);
                })
                .catch(() => {
                    return res.send({capa: false});
                });
            if (fs.existsSync(tempPath)) {
                fs.unlinkSync(tempPath);
            }
            let alterou = await updateUser(req.iduser, {capa: novoNome});
            return res.send({capa: alterou ? novoNome : false});
        }else{
            return res.send({capa: false});
        }
    } catch {
        return res.send({capa: false});
    }
}

function gerarNomeAleatorio() {
    const prefixo = 'user-capa';
    const timestamp = Date.now();
    const numeroAleatorio = Math.floor(Math.random() * 10000000000000);
    const extensao = 'jpg';

    return `${prefixo}-${timestamp}-${numeroAleatorio}.${extensao}`;
}