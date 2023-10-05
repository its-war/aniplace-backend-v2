const getUser = require('../models/user/getById');
module.exports = async (req, res, next) => {
    try{
        let user = await getUser(req.iduser);
        if(user.ranking > 5){
            next();
        }else{
            return res.status(404).json({error: 'Not Found.'});
        }
    }catch{
        return res.status(404).json({error: 'Not Found.'});
    }
}