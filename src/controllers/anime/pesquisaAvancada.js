const pesquisaAvancada = require('../../models/animes/pesquisaAvancada');
const {matchedData, validationResult} = require('express-validator');
module.exports = async (req, res) => {
    let erros = validationResult(req);
    if(erros.isEmpty()){
        let dados = matchedData(req);
        dados.letra = dados.letra ?? false;
        dados.ano = dados.ano ?? false;
        dados.disponibilidade = dados.disponibilidade ?? false;
        dados.audio = dados.audio ?? false;
        dados.status = dados.status ?? false;
        dados.generos = dados.generos ?? false;
        let pagina = dados.pagina ?? 1;
        dados.pagina ? delete dados.pagina : false;

        try{
            let {animes, total} = await pesquisaAvancada(dados, pagina);
            return res.send({animes: animes, total: total});
        }catch(error){
            return res.send({errors: ['Search failed.']});
        }
    }else{
        return res.send({errors: erros.array()});
    }
}