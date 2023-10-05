const getUltimosAnimes = require('../../models/animes/getUltimosAnimes');
module.exports = async (req, res) => {
    try{
        let animes = await getUltimosAnimes();
        return res.send({animes: animes});
    }catch(e){
        console.log(e);
        return res.send({animes: []});
    }
}