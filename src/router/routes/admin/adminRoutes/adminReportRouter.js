const adminReportRouter = require('express').Router();
const controller = require('../../../../controllers/report');

adminReportRouter.get('/getReportsInfo', controller.getReportsInfo);

module.exports = adminReportRouter;