const conn = require('../../config/database');
module.exports = (idUser, idAnime) => {
    conn.query(
        `update atividade set registro = NOW() where idUser = ? and idAnime = ?`,
        [idUser, idAnime],
        (err) => {
            if(err){
                throw new Error('Erro ao atualizar atividade do usuário. (updateRegistro.js)');
            }
        }
    );
}