const conn = require('../../config/database');
const fs = require('fs');
module.exports = async (idAnime) => {
    let imgCampos = await new Promise((resolve, reject) => {
        conn.query('select foto, capa from animes where idAnime=?', idAnime, (err, results,fields) => {
            if(results.length <= 0){
                resolve(false);
            }else{
                if(err){
                    reject(false);
                }else{
                    resolve(results);
                }
            }
        });
    });

    if(imgCampos){
        return new Promise((resolve, reject) => {
            conn.query('delete from animes where idAnime=?', idAnime, (err, result, fields) => {
                if(err){
                    reject(err);
                }else{
                    fs.unlinkSync("public/img/anime/foto/" +imgCampos[0].foto);
                    fs.unlinkSync("public/img/anime/capa/" +imgCampos[0].capa);
                    resolve(result);
                }
            });
        });
    }else{
        return false;
    }
}