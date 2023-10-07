const adsRouter = require('express').Router();
const controller = require('../../controllers/ads');

adsRouter.get('/banner-728x90', controller.banner728x90);
adsRouter.get('/banner-320x50', controller.banner320x50);
adsRouter.get('/adsActive', controller.adsActive);

module.exports = adsRouter;