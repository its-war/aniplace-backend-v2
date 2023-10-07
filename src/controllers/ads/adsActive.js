const listarConfig = require('../../models/config/listar');
module.exports = async (req, res) => {
    try {
        let configs = await listarConfig();
        console.log(configs.adsActive);
        return res.send({adsActive: configs.adsActive});
    } catch {
        return res.send({adsActive: true});
    }
}