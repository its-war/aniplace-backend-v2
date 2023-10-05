const reportRouter = require('express').Router();
const {body} = require('express-validator');
const controller = require('../../controllers/report');

reportRouter.post('/inserir',
    body('idAnime').notEmpty().isInt().escape(),
    body('idEpisodio').notEmpty().isInt().escape(),
    controller.inserir
);

module.exports = reportRouter;