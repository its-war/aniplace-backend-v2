const conn = require('../../config/database');
module.exports = async (idAnime) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'SELECT numero, temporada, linkOnline, link1080p, link720p, duplo, ova FROM episodios WHERE idAnime = ? ORDER BY temporada, numero',
            idAnime,
            (err, results, fields) => {
                if(err){
                    reject(err);
                }else{
                    const temporadas = [];

                    let temporadaAtual = null;
                    let temporadaIndex = -1;

                    results.forEach(row => {
                        if (temporadaAtual !== row.temporada) {
                            temporadaAtual = row.temporada;
                            temporadaIndex = temporadas.push({
                                numero: temporadaAtual,
                                episodios: [],
                            }) - 1;
                        }

                        temporadas[temporadaIndex].episodios.push({
                            numero: row.numero,
                            links: [row.linkOnline, row.link1080p, row.link720p],
                            duplo: row.duplo,
                            ova: row.ova,
                        });
                    });
                    console.table(temporadas);
                    resolve(temporadas);
                }
            }
        );
    });
}