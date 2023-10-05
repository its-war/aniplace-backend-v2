const comentarioRouter = require('express').Router();
const controller = require('../../controllers/comentario');
const checkToken = require('../../middlewares/checkUserToken');
const {body, query} = require('express-validator');

comentarioRouter.post('/inserir',
    checkToken,
    body('texto').notEmpty().isLength({max: 255}).escape(),
    body('tipo').notEmpty().isInt({min: 1, max: 3}).escape(),
    body('idOrigem').notEmpty().isInt().escape(),
    body('idUser').notEmpty().isInt().escape(),
    controller.inserir
);
comentarioRouter.get('/listar',
    query('tipo').notEmpty().isInt().escape(),
    query('idOrigem').notEmpty().isInt().escape(),
    query('ordem').notEmpty().isInt({min: 1, max: 2}).escape(),
    controller.listar
);
comentarioRouter.post('/curtirComentario',
    checkToken,
    body('idComentario').notEmpty().isInt().escape(),
    controller.curtirComentario
);
comentarioRouter.post('/responder',
    checkToken,
    body('texto').notEmpty().isLength({min: 1, max: 100}).escape(),
    body('idComentario').notEmpty().isInt().escape(),
    controller.responder
);
comentarioRouter.post('/curtirResposta',
    checkToken,
    body('idResposta').notEmpty().isInt().escape(),
    controller.curtirResposta
);
comentarioRouter.get('/listarRespostas',
    query('idComentario').notEmpty().isInt().escape(),
    controller.listarRespostas
);
comentarioRouter.put('/editar',
    checkToken,
    body('opcao').notEmpty().isInt({min: 1, max: 2}),
    body('id').notEmpty().isInt().escape(),
    body('texto').notEmpty().escape(),
    controller.editar
);
comentarioRouter.delete('/delete',
    checkToken,
    body('opcao').notEmpty().isInt({min: 1, max: 2}),
    body('id').notEmpty().isInt().escape(),
    controller.deletar
);

module.exports = comentarioRouter;