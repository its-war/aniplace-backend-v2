const router = require('express').Router();

const adminRouter = require('./routes/admin');
const animeRouter = require('./routes/animeRouter');
const userRouter = require('./routes/userRouter');
const episodioRouter = require('./routes/episodioRouter');
const reportRouter = require('./routes/reportRouter');
const ratingRouter = require('./routes/ratingRouter');
const comentarioRouter = require('./routes/comentarioRouter');
const adsRouter = require('./routes/adsRouter')

const checkToken = require('../middlewares/checkUserToken');
const isAdmin = require('../middlewares/isAdmin');

router.use('/admin', checkToken, isAdmin, adminRouter);
router.use('/anime', animeRouter);
router.use('/user', userRouter);
router.use('/episodio', episodioRouter);
router.use('/rating', ratingRouter);
router.use('/report', reportRouter);
router.use('/comentario', comentarioRouter);
router.use('/ads', adsRouter);

module.exports = router;