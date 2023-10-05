const deletarAnime = require('../../models/animes/deletar');
const {matchedData, validationResult} = require('express-validator');
module.exports = async (req, res) => {
    const result = validationResult(req);
    if(result.isEmpty()){
        const id = matchedData(req).id;
        let rows = await deletarAnime(id);
        if(rows.affectedRows > 0){
            return res.send({delete: true});
        }else{
            return res.send({delete: false});
        }
    }else{
        res.send({errors: result.array()});
    }
}