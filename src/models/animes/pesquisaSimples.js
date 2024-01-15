const conn = require('../../config/database');
const he = require('he');
module.exports = async (texto, pagina) => {
    let offset = (pagina - 1) * 15;
    let totalResultados = await new Promise((resolve, reject) => {
        conn.query(`select count(*) as total from animes where nome like "%${texto}%" or nomeAlternativo like "%${texto}%" limit ?, ?`, [offset, 15], (err, results, fields) => {
            if(err){
                reject(err);
            }else{
                resolve(results[0].total);
            }
        });
    });

    if(totalResultados){
        let totalPages = Math.ceil(totalResultados / 15);

        return new Promise((resolve, reject) => {
            conn.query(`select * from animes where nome like "%${texto}%" or nomeAlternativo like "%${texto}%" limit ?, ?`, [offset, 15], (err, results, fields) => {
                if(err){
                    reject(err);
                }else{
                    const animes = results.map(a => ({
                        idAnime: a.idAnime,
                        nome: a.nome ? he.decode(a.nome) : a.nome,
                        nomeAlternativo: a.nomeAlternativo ? he.decode(a.nomeAlternativo) : a.nomeAlternativo,
                        generos: a.generos,
                        status: a.status,
                        dia: a.dia,
                        temporadaLancamento: a.temporadaLancamento,
                        ano: a.ano,
                        disponibilidade: a.disponibilidade,
                        audio: a.audio,
                        site: a.site ? he.decode(a.site) : a.site,
                        myanimelist: a.myanimelist ? he.decode(a.myanimelist) : a.myanimelist,
                        sinopse: JSON.parse(a.sinopse ? he.decode(a.sinopse) : a.sinopse),
                        foto: a.foto,
                        capa: a.capa,
                        prints: a.prints,
                        acessos: a.acessos
                    }));
                    resolve({animes: animes, total: totalPages});
                }
            });
        });
    }else{
        return false;
    }
}