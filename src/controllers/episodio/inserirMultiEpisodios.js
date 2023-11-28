const {matchedData, validationResult} = require('express-validator');
const salvarEpisodios = require('../../models/episodios/inserirMultiEpisodios');
const listarAnime = require('../../models/animes/listar');
const listarTemporadas = require('../../models/episodios/listar');
module.exports = async (req, res) => {
    const result = validationResult(req);
    if(result.isEmpty()){
        let dados = matchedData(req);

        dados.linksOnline = dados.linksOnline.split('\n');
        dados.links1080p = dados.links1080p.split('\n');
        dados.links720p = dados.links720p.split('\n');

        let episodios = [];

        const timestamp = Date.now(); // Obtém o timestamp em milissegundos
        const dataAdicao = new Date(timestamp); // Cria um objeto Date com o timestamp

        // Extrai a parte da data no formato "YYYY-MM-DD"
        let registro = dataAdicao.toISOString().slice(0, 10);

        const tipoAnime = (await listarAnime(2, 1, dados.idAnime))[0].tipo;
        let valorInicial = 0;
        if(tipoAnime > 1){
            const ultimaTemporada = (await listarTemporadas(dados.idAnime)).temporadas.pop();
            if(ultimaTemporada){
                const ultimoEpisodio = ultimaTemporada.episodios.pop();
                valorInicial = ultimoEpisodio.numero;

                if(ultimoEpisodio.duplo){
                    valorInicial++;
                }
            }
        }

        let limiteEpisodios = dados.linksOnline.length + valorInicial;
        let contador = valorInicial + 1;
        for(let i = valorInicial; i < limiteEpisodios; i++){
            if(dados.episodiosDuplos[i - valorInicial] === 'true'){
                episodios.push({
                    numero: contador,
                    linkOnline: dados.linksOnline[i - valorInicial],
                    link1080p: dados.links1080p[i -valorInicial],
                    link720p: dados.links720p[i - valorInicial],
                    registro: registro,
                    duplo: true
                });
                contador++;
            }else{
                episodios.push({
                    numero: contador,
                    linkOnline: dados.linksOnline[i - valorInicial],
                    link1080p: dados.links1080p[i -valorInicial],
                    link720p: dados.links720p[i - valorInicial],
                    registro: registro,
                    duplo: false
                });
            }
            contador++;
        }

        return res.send({cadastro: await salvarEpisodios(episodios, dados.temporada, dados.idAnime)});
    }else{
        return res.send({errors: result.array()});
    }
}