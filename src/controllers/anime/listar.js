const listarAnimes = require('../../models/animes/listar');
const listarGeneros = require('../../models/animes/listarGeneros');
const totalPaginas = require('../../models/animes/totalPaginas');
const listarEpisodios = require('../../models/episodios/listar');
const incrementarAnimeAcessos = require('../../models/animes/incrementarAcesso');
const {matchedData, validationResult} = require('express-validator');
module.exports = async (req, res) => {
    const errors = validationResult(req);
    if(errors.isEmpty()){
        let dados = matchedData(req);
        let lista = [];

        if(dados.id.length > 0){
            lista = await listarAnimes(2, 1, dados.id);
            for(let i = 0; i < lista.length; i++){
                lista[i].temporadas = (await listarEpisodios(dados.id)).temporadas;
                lista[i].sinopse = JSON.parse(lista[i].sinopse);
                lista[i].generos = await listarGeneros(lista[i].generos);
                lista[i].prints = lista[i].prints.split('_');
            }
            incrementarAnimeAcessos(dados.id);
            return res.send(lista);
        }

        if(dados.campos.length > 0){
            lista = await listarAnimes(3, dados.pagina.length > 0 ? dados.pagina : 1, dados.id.length > 0 ? dados.id : null, dados.campos);
            let ag = dados.campos.split(',');
            for(let i = 0; i < ag.length; i++){
                if(ag[i] === 'generos'){
                    for(let j = 0; j < lista.length; j++){
                        lista[j].generos = await listarGeneros(lista[j].generos);
                    }
                }
                if(ag[i] === 'sinopse'){
                    for(let j = 0; j < lista.length; j++){
                        lista[j].sinopse = JSON.parse(lista[j].sinopse);
                    }
                }
            }
            let total = await totalPaginas();
            total = Math.ceil(total / 15);
            return res.send({animes: lista, total: total});
        }

        try{
            lista = await listarAnimes(1, dados.pagina.length > 0 ? dados.pagina : 1);
            for(let i = 0; i < lista.length; i++){
                //lista[i].sinopse = JSON.parse(lista[i].sinopse);
                //TODO: solucionar problema com uma solução melhor
                lista[i].generos = await listarGeneros(lista[i].generos);
            }
            let total = await totalPaginas();
            total = Math.ceil(total / 15);
            return res.send({animes: lista, total: total});
        } catch(err){
            console.error(err);
            return res.send({errors: [err]});
        }
    }

    res.send({errors: errors.array()});
}