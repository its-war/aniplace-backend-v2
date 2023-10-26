const conn = require('../../config/database');
module.exports = (idAnime) => {
    conn.query('update animes set acessos = acessos + 1 where idAnime=?', idAnime, (err, result, fields) => {
        if(err) {
            console.log(err);
        }
    });
}