const adminUserRouter = require('express').Router();
const controller = require('../../../../controllers/user');

adminUserRouter.get('/listar', controller.listar);
adminUserRouter.get('/getUsersInfo', controller.getUsersInfo);

module.exports = adminUserRouter;