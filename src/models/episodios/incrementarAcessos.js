const conn = require('../../config/database');
module.exports = async (idEpisodio) => {
    conn.query('update episodios set acessos = acessos + 1 where idEpisodio=?', idEpisodio, (err, result, fields) => {
        if(err) {
            console.log(err);
        }
    });
}