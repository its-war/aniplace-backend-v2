const jwt = require('jsonwebtoken');
module.exports = async (req, res, next) => {
    let token = null;

    if(process.env.MODE === 'development'){
        token = req.headers['authorization'];
    }
    if(process.env.MODE === 'production'){
        token = req.cookies['token'];
    }

    if(!token){
        return res.status(401).json({ error: 'User not logged.' });
    }

    jwt.verify(token, process.env.SERVERSECRET, (err, decoded) => {
        if(err){
            return res.status(401).json({ error: 'User not logged.' });
        }

        req.iduser = decoded.id;
        next();
    });
}