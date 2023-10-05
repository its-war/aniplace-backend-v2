const listarGeneros = require('../../models/animes/listarGeneros');
module.exports = async (req, res) => {
    let generos = await listarGeneros();
    return res.send({generos: generos});
}