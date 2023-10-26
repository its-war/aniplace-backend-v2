const conn = require('../../config/database');
module.exports = (idAnime, numero, temporada) => {
    conn.query('update episodios set acessos = acessos + 1 where idAnime=? and numero=? and temporada=?',
        [idAnime, numero, temporada], (err, result, fields) => {
            if(err){
                console.log(err);
            }
        });
}