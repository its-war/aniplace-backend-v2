const getAnimesMaisAcessados = require('../../models/animes/getAnimesMaisAcessados');
const getTopLancamentos = require('../../models/animes/getTopLancamentos');
const getDestaques = require('../../models/destaques/getDestaques');
const he = require('he');
module.exports = async (req, res) => {
    let campos = [
        'idAnime',
        'nome',
        'sinopse',
        'capa'
    ];
    let animes = [];
    let destaques = await getDestaques();
    let top = await getTopLancamentos(5, campos.join(','));
    let acessados = await getAnimesMaisAcessados(6, campos.join(','));

    if(destaques.length > 0){
        function animeNaoExisteNoResultado(anime) {
            return !animes.some(item => item.idAnime === anime.idAnime);
        }

        function mesclarAnimes(array) {
            array.forEach(anime => {
                if (animeNaoExisteNoResultado(anime)) {
                    animes.push(anime);
                }
            });
        }

        mesclarAnimes(destaques);
        mesclarAnimes(top);
        mesclarAnimes(acessados);
    }else{
        animes = top;

        for(let i = 0; i < acessados.length; i++){
            animes.push(acessados[i]);
        }
    }

    for(let i = 0; i < animes.length; i++){
        animes[i].sinopse = JSON.parse(he.decode(animes[i].sinopse));
    }

    return res.send({destaques: animes});
}