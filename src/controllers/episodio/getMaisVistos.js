const getMaisVistos = require('../../models/episodios/getMaisVistos');
module.exports = async (req, res) => {
    try{
        let episodios = await getMaisVistos();
        return res.send({episodios: episodios});
    }catch{
        return res.send({episodios: []});
    }
}