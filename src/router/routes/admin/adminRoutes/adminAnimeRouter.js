const adminAnimeRouter = require('express').Router();
const controller = require("../../../../controllers/anime");
const {body, query, validationResult} = require("express-validator");
const multer = require('multer');
const uploadFotoCapa = multer({ dest: 'uploads/' }).fields([
    { name: 'foto', maxCount: 1 },
    { name: 'capa', maxCount: 1 },
]);
const simplesUpload = multer({dest: 'uploads/'});

adminAnimeRouter.post('/inserir',
    uploadFotoCapa,
    body('nome').notEmpty().escape().trim(),
    body('nomeAlternativo').optional().escape().trim(),
    body('generos').escape().notEmpty().trim(),
    body('status').escape().isInt().isLength({max: 1}).notEmpty().trim(),
    body('ano').escape().isInt().notEmpty().trim(),
    body('disponibilidade').escape().isInt().notEmpty().trim(),
    body('site').optional().escape().trim(),
    body('myanimelist').optional().escape().trim(),
    body('sinopse').escape().notEmpty().trim(),
    body('prints').optional().escape().trim(),
    body('dia').optional().isInt().escape().trim(),
    body('tipo').optional().isInt().escape().trim(),
    controller.inserir
);
adminAnimeRouter.put('/alterar',
    body('id').notEmpty().isInt().escape(),
    body('nome').optional().notEmpty().escape().trim(),
    body('nomeAlternativo').optional().escape().trim(),
    body('generos').optional().escape().notEmpty().trim(),
    body('status').optional().escape().isInt().isLength({max: 1}).notEmpty().trim(),
    body('ano').optional().escape().isInt().notEmpty().trim(),
    body('site').optional().escape().trim(),
    body('myanimelist').optional().escape().trim(),
    body('sinopse').optional().escape().notEmpty().trim().isArray(),
    controller.alterar
);
adminAnimeRouter.put('/alterarFoto',
    simplesUpload.single('img'),
    body('id').notEmpty().isInt().escape(),
    body('opcao').notEmpty().escape().isInt().isLength({max: 1}),
    controller.alterarFoto
);
adminAnimeRouter.delete('/deletar',
    body('id').notEmpty().isInt().escape(),
    controller.deletar
);
adminAnimeRouter.post('/addPrints',
    simplesUpload.array('imgs'),
    query('idAnime').isInt(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.send({ errors: errors.array() });
        }
        next();
    },
    controller.uploadPrints
);
adminAnimeRouter.put('/alterarPrints',
    simplesUpload.array('imgs'),
    body('idAnime').notEmpty().isInt().escape(),
    body('manter').optional().escape(),
    body('deletions').optional().escape(),
    controller.alterarPrints
);
adminAnimeRouter.get('/listarTodos', controller.listarTodos);
adminAnimeRouter.get('/getUltimosAnimes', controller.getUltimosAnimes);
adminAnimeRouter.get('/getAnimesInfo', controller.getAnimesInfo);

module.exports = adminAnimeRouter;