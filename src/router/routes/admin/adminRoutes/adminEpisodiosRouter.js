const adminEpisodiosRouter = require('express').Router();
const controller = require('../../../../controllers/episodio');
const {body, query} = require('express-validator');

adminEpisodiosRouter.post('/inserir',
    body('idAnime').notEmpty().isInt().escape(),
    body('numero').notEmpty().isInt().escape(),
    body('temporada').notEmpty().isInt().escape(),
    body('linkOnline').notEmpty().escape(),
    body('link1080p').notEmpty().escape(),
    body('link720p').notEmpty().escape(),
    body('ova').notEmpty().isBoolean(),
    controller.inserir
);
adminEpisodiosRouter.post('/inserirMultiEpisodios',
    body('idAnime').notEmpty().escape(),
    body('temporada').notEmpty().escape(),
    body('links1080p').notEmpty(),
    body('links720p').notEmpty(),
    body('linksOnline').notEmpty(),
    body('episodiosDuplos').optional().isArray().escape(),
    controller.inserirMultiEpisodios
);
adminEpisodiosRouter.get('/listar',
    query('idAnime').notEmpty().isInt().escape(),
    controller.listar
);
adminEpisodiosRouter.get('/getEpisodiosInfo', controller.getEpisodiosInfo);
adminEpisodiosRouter.get('/listarById',
    query('idAnime').notEmpty().isInt().escape(),
    query('temporada').notEmpty().isInt().escape(),
    query('numero').notEmpty().isInt().escape(),
    controller.listarById
);
adminEpisodiosRouter.post('/atualizar',
    body('idEpisodio').notEmpty().isInt().escape(),
    body('link').notEmpty().escape(),
    body('ova').notEmpty().isBoolean(),
    controller.atualizar
);

module.exports = adminEpisodiosRouter;