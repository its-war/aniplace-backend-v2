const episodioRouter = require('express').Router();
const controller = require('../../controllers/episodio');
const {query} = require('express-validator');

episodioRouter.get('/getMaisVistos', controller.getMaisVistos);
episodioRouter.get('/getUltimos7Dias',
    query('limite').optional().isInt().escape(),
    controller.getUltimos7Dias
);
episodioRouter.get('/hasTemporada',
    query('idAnime').notEmpty().isInt().escape(),
    query('tipo').optional().isInt().escape(),
    controller.hasTemporada
);
episodioRouter.get('/getLancamentos',
    query('limite').optional().isInt().escape(),
    query('pagina').optional().isInt().escape(),
    controller.getLancamentos
);
episodioRouter.get('/listar',
    query('idAnime').notEmpty().isInt().escape(),
    controller.listar
);

module.exports = episodioRouter;