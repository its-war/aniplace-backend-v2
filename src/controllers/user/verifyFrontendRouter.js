const jwt = require('jsonwebtoken');
const getUser = require('../../models/user/getUser');
module.exports = async (req, res) => {
    const token = req.headers['authorization'];

    if(!token){
        return res.status(401).json({authorization: false});
    }

    jwt.verify(token, process.env.SERVERSECRET, async (err, decoded) => {
        if(err){
            return res.status(401).json({authorization: false});
        }

        let user = await getUser(decoded.id);
        if(user){
            return res.send({authorization: true, user: user});
        }else{
            return res.status(401).json({authorization: false});
        }
    });
}