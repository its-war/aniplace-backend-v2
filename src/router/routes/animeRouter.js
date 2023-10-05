const animeRouter = require('express').Router();
const controller = require('../../controllers/anime');
const {query} = require('express-validator');
const checkToken = require('../../middlewares/checkUserToken');

animeRouter.get('/listar',
    query('id').escape(),
    query('pagina').escape(),
    query('campos').escape(),
    controller.listar
);
animeRouter.get('/pesquisaAvancada',
    query('letra').optional().escape().isLength({max: 1}),
    query('ano').optional().escape().isInt().isLength({min: 4, max: 4}),
    query('disponibilidade').optional().escape().isInt().isLength({max: 1}),
    query('audio').optional().escape().isInt().isLength({max: 1}),
    query('status').optional().escape().isInt().isLength({max: 1}),
    query('generos').optional().escape(),
    query('pagina').optional().escape().isInt(),
    controller.pesquisaAvancada
);
animeRouter.get('/pesquisa',
    query('texto').notEmpty().escape(),
    query('pagina').notEmpty().escape().isInt(),
    controller.pesquisa
);
animeRouter.get('/listarGeneros', controller.getGeneros);
animeRouter.get('/getDestaques', controller.getDestaques);
animeRouter.get('/getEpisodio',
    query('idAnime').notEmpty().isInt().escape(),
    query('temporada').notEmpty().isInt().escape(),
    query('numero').notEmpty().isInt().escape(),
    controller.getEpisodio
);
animeRouter.get('/getMaisAcessados', controller.getMaisAcessados);
animeRouter.get('/getTopAnimes',
    query('limite').optional().isInt().escape(),
    controller.getTopAnimes
);
animeRouter.get('/getFuturosLancamentos',
    query('limite').optional().isInt().escape(),
    controller.getFuturosLancamentos
);

module.exports = animeRouter;