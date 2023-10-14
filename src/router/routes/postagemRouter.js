const postagemRouter = require('express').Router();
const controller = require('../../controllers/postagens');
const checkToken = require('../../middlewares/checkUserToken');
const {body, query} = require('express-validator');
const multer = require('multer');
const postImg = multer({dest: 'uploads/'}).fields([
    {name: 'imagem', maxCount: 1}
]);

postagemRouter.post('/newPost',
    checkToken,
    postImg,
    body('texto').optional().isLength({min: 1, max: 500}).escape(),
    controller.newPost
);
postagemRouter.get('/getPostagens',
    query('pagina').optional().isInt().escape(),
    controller.getPostagens
);
postagemRouter.post('/curtir',
    checkToken,
    body('idPostagem').notEmpty().isInt().escape(),
    controller.curtir
);
postagemRouter.delete('/delete',
    checkToken,
    body('idPostagem').notEmpty().isInt().escape(),
    controller.deletarPost
);

module.exports = postagemRouter;