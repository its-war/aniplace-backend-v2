const listar = require('../../models/animes/listarTodos');
module.exports = async (req, res) => {
    return res.send({animes: await listar()});
}