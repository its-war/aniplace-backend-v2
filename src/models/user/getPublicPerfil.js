const conn = require('../../config/database');
const he = require('he');
module.exports = async (idUser) => {
    return new Promise((resolve, reject) => {
        conn.query(
            `select u.idUser,
                    u.nome,
                    u.username,
                    u.email,
                    u.status,
                    u.ranking,
                    u.foto,
                    u.capa,
                    u.apelido,
                    u.biografia,
                    u.pronome,
                    u.nascimento,
                    u.registro,
                    u.genero,
                    u.animeFavorito,
                    u.personagemFavorito,
                    a.idAnime,
                    a.nome as animeNome,
                    a.capa as animeCapa
             from user u
                 left join animes a on u.animeFavorito = a.idAnime
             where idUser = ?
             group by u.idUser`,
            idUser,
            (err, result, fields) => {
                if (err) {
                    reject(err);
                } else {
                    if(result[0]){
                        const user = {
                            idUser: result[0].idUser,
                            nome: result[0].nome,
                            username: result[0].username,
                            email: result[0].email,
                            status: result[0].status,
                            ranking: result[0].ranking,
                            foto: result[0].foto,
                            capa: result[0].capa,
                            apelido: result[0].apelido ? he.decode(result[0].apelido) : null,
                            biografia: result[0].biografia ? he.decode(result[0].biografia) : null,
                            pronome: result[0].pronome,
                            nascimento: result[0].nascimento,
                            registro: result[0].registro,
                            genero: result[0].genero,
                            animeFavorito: result[0].animeFavorito ? {
                                idAnime: result[0].idAnime,
                                nome: result[0].animeNome,
                                capa: result[0].animeCapa
                            } : null,
                            personagemFavorito: result[0].personagemFavorito ? he.decode(result[0].personagemFavorito) : null
                        }
                        resolve(result[0] ? user : {
                            idUser: null,
                            nome: null,
                            username: null,
                            email: null,
                            status: null,
                            ranking: null,
                            foto: null,
                            capa: null,
                            apelido: null,
                            biografia: null,
                            pronome: null,
                            nascimento: null,
                            registro: null,
                            genero: null,
                            animeFavorito: null,
                            personagemFavorito: null
                        });
                    }else{
                        resolve({
                            idUser: null,
                            nome: null,
                            username: null,
                            email: null,
                            status: null,
                            ranking: null,
                            foto: null,
                            capa: null,
                            apelido: null,
                            biografia: null,
                            pronome: null,
                            nascimento: null,
                            registro: null,
                            genero: null,
                            animeFavorito: null,
                            personagemFavorito: null
                        });
                    }
                }
            }
        );
    });
}