const adminRouter = require('express').Router();

const adminAnimeRouter = require('./adminRoutes/adminAnimeRouter');
const adminEpisodiosRouter = require('./adminRoutes/adminEpisodiosRouter');
const adminUserRouter = require('./adminRoutes/adminUserRouter');
const adminReportRouter = require('./adminRoutes/adminReportRouter');
const adminDestaqueRouter = require('./adminRoutes/adminDestaquesRouter');

adminRouter.use('/anime', adminAnimeRouter);
adminRouter.use('/episodio', adminEpisodiosRouter);
adminRouter.use('/user', adminUserRouter);
adminRouter.use('/report', adminReportRouter);
adminRouter.use('/destaque', adminDestaqueRouter);

module.exports = adminRouter;