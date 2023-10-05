const listar = require('../../models/user/listar');
module.exports = async (req, res) => {
    try{
        let users = await listar();
        return res.send({users: users});
    }catch{
        return res.send({users: []});
    }
}