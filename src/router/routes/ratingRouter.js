const ratingRouter = require('express').Router();
const controller = require('../../controllers/rating');
const checkToken = require('../../middlewares/checkUserToken');
const {body, query} = require('express-validator');

ratingRouter.post('/votar',
    checkToken,
    body('idAnime').notEmpty().isInt().escape(),
    body('nota').notEmpty().isInt().escape(),
    controller.votar
);
ratingRouter.get('/getVoto',
    checkToken,
    query('idAnime').notEmpty().isInt().escape(),
    controller.getVoto
);
ratingRouter.get('/getAnimeNota',
    query('idAnime').notEmpty().isInt().escape(),
    controller.getAnimeNota
);

module.exports = ratingRouter;