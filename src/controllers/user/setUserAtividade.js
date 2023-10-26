const inserirIgnore = require('../../models/atividade/inserirIgnore');
const updateRegistro = require('../../models/atividade/updateRegistro');
const deleteAntigos = require('../../models/atividade/deleteAntigos');
module.exports = async (idUser, idAnime) => {
    try {
        let inseriu = await inserirIgnore(idUser, idAnime);
        if(!inseriu){
            updateRegistro(idUser, idAnime);
        }
        deleteAntigos(idUser);
    } catch(e) {
        console.error(e);
    }
}