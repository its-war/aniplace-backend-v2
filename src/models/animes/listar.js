const conn = require('../../config/database');
const he = require('he');
module.exports = async (opcao, pagina = 1, id = null, campos = null) => {
    switch (opcao){
        case 1:{// listar tudo
            return new Promise((resolve, reject) => {
                let tamanhoPagina = 15;
                let offset = (pagina - 1) * tamanhoPagina;
                conn.query('select * from animes order by nome asc limit ? offset ?', [tamanhoPagina, offset], (err, results, fields) => {
                    if(err){
                        reject(err);
                    }else{
                        for(let i = 0; i < results.length; i++){
                            results[i].nome = he.decode(results[i].nome);
                            if(results[i].nomeAlternativo !== null){
                                results[i].nomeAlternativo = he.decode(results[i].nomeAlternativo);
                            }
                            results[i].generos = he.decode(results[i].generos);
                            if(results[i].site !== null){
                                results[i].site = he.decode(results[i].site);
                            }
                            if(results[i].myanimelist !== null){
                                results[i].myanimelist = he.decode(results[i].myanimelist);
                            }
                            results[i].sinopse = he.decode(results[i].sinopse);
                            results[i].foto = he.decode(results[i].foto);
                            results[i].capa = he.decode(results[i].capa);
                            if(results[i].prints !== null){
                                results[i].prints = he.decode(results[i].prints);
                            }
                        }
                        resolve(results);
                    }
                });
            });
        }
        case 2:{//listar por id
            return new Promise((resolve, reject) => {
                conn.query('select * from animes where idAnime=?', id, (err, result, fields) => {
                    if(err){
                        reject(err);
                    }else{
                        if(result.length > 0){
                            result[0].nome = he.decode(result[0].nome);
                            if(result[0].nomeAlternativo !== null){
                                result[0].nomeAlternativo = he.decode(result[0].nomeAlternativo);
                            }
                            result[0].generos = he.decode(result[0].generos);
                            if(result[0].site !== null){
                                result[0].site = he.decode(result[0].site);
                            }
                            if(result[0].myanimelist !== null){
                                result[0].myanimelist = he.decode(result[0].myanimelist);
                            }
                            result[0].sinopse = he.decode(result[0].sinopse);
                            result[0].foto = he.decode(result[0].foto);
                            result[0].capa = he.decode(result[0].capa);
                            if(result[0].prints !== null){
                                result[0].prints = he.decode(result[0].prints);
                            }
                        }
                        resolve(result);
                    }
                });
            });
        }
        case 3:{
            return new Promise((resolve, reject) => {
                if(id !== null && campos !== null){
                    conn.query('select ? from animes where idAnime=?', [campos, id], (err, result, fields) => {
                        if(err){
                            reject(err);
                        }else{
                            campos = campos.split(',');
                            for(let i = 0; i < campos.length; i++){
                                if(campos[i] !== 'ano' && campos[i] !== 'status'){
                                    if(result[0][campos[i]] !== null){
                                        result[0][campos[i]] = he.decode(result[0][campos[i]]);
                                    }
                                }
                            }
                            resolve(result);
                        }
                    });
                }
                let tamanhoPagina = 15;
                let offset = (pagina - 1) * tamanhoPagina;
                conn.query('select '+ campos +' from animes order by nome asc limit ? offset ?', [tamanhoPagina, offset], (err, results, fields) => {
                    if(err){
                        reject(err);
                    }else{
                        campos = campos.split(',');
                        for(let i = 0; i < campos.length; i++){
                            if(campos[i] !== 'ano' && campos[i] !== 'status'){
                                for(let j = 0; j < results.length; j++){
                                    if(results[j][campos[i]] !== null){
                                        results[j][campos[i]] = he.decode(results[j][campos[i]]);
                                    }
                                }
                            }
                        }
                        resolve(results);
                    }
                });
            });
        }
        default:{return}
    }
}