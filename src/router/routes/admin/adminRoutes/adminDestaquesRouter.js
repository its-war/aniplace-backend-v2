const adminDestaquesRouter = require('express').Router();
const controller = require('../../../../controllers/destaque');
const {body, query} = require('express-validator');

adminDestaquesRouter.get('/hasDestaque',
    query('idAnime').notEmpty().isInt().escape(),
    controller.hasDestaque
);
adminDestaquesRouter.post('/inserir',
    body('idAnime').notEmpty().isInt().escape(),
    body('numero').notEmpty().isInt().escape(),
    controller.cadastrar
);

module.exports = adminDestaquesRouter;