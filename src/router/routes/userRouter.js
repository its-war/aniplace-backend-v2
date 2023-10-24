const userRouter = require('express').Router();

const controller = require('../../controllers/user');
const {body, query} = require('express-validator');
const hasEmail = require('../../models/user/hasEmail');
const hasUsername = require('../../models/user/hasUsername');
const checkToken = require('../../middlewares/checkUserToken');
const multer = require('multer');
const fotoUser = multer({dest: 'uploads/'}).fields([
    {name: 'foto', maxCount: 1}
]);
const capaUser = multer({dest: 'uploads/'}).fields([
    {name: 'capa', maxCount: 1}
]);

userRouter.post('/inserir',
    body('nome').isAlpha('pt-BR', {ignore: ' '}).trim().escape().notEmpty(),
    body('username').trim().escape().notEmpty().custom(async value => {
        const existUsername = await hasUsername(value);
        if(existUsername){
            throw new Error('Esse nome de usuário não é válido.');
        }
    }),
    body('email').optional().trim().isEmail({host_whitelist: ['gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com', 'icloud.com', 'me.com']}).escape().notEmpty().custom(async value => {
        const existEmail = await hasEmail(value);
        if(existEmail){
            throw new Error('Esse email não é válido.');
        }
    }),
    body('senha').notEmpty().isLength({min: 8}),
    body('idCaptcha').notEmpty().trim().escape(),
    body('texto').notEmpty().trim().escape(),
    controller.inserir
);
userRouter.post('/login',
    (req, res, next) => {
        const jwt = require('jsonwebtoken');
        const token = req.cookies.token;
        if(token){
            jwt.verify(token, process.env.SERVERSECRET, (err, decoded) => {
                if(err){
                    next();
                }else{
                    return res.send({error: 'User is logged.'});
                }
            });
        }else{
            next();
        }
    },
    body('username').notEmpty().trim().escape(),
    body('senha').notEmpty(),
    body('idCaptcha').notEmpty().trim().escape(),
    body('texto').notEmpty().trim().escape(),
    controller.login
);
userRouter.put('/refresh-token', controller.refreshToken);
userRouter.get('/logout', controller.logout);
userRouter.get('/getCaptcha',
    query('idCaptcha').optional().isInt().escape(),
    controller.getLoginCaptcha
);
userRouter.get('/verify-frontend-router', controller.verifyFrontendRouter);
userRouter.get('/getTopUsers', controller.getTopUsers);
userRouter.get('/getPublicPerfil',
    query('idUser').notEmpty().isInt().escape(),
    controller.getUserPublicPerfil
);
userRouter.post('/setFoto',
    checkToken,
    fotoUser,
    controller.uploadFoto
);
userRouter.post('/setCapa',
    checkToken,
    capaUser,
    controller.uploadCapa
);

module.exports = userRouter;