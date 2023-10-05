const jwt = require('jsonwebtoken');
const getUser = require('../../models/user/getByChave');
module.exports = async (req, res) => {
    let refreshToken = req.body.refreshToken;
    if(!refreshToken){
        return res.send({login: false, error: 'Token invalid.'});
    }

    jwt.verify(refreshToken, process.env.SERVERSECRETREFRESH, async (err, decoded) => {
        if(err){
            return res.send({login: false, error: 'Token invalid.'});
        }

        try{
            const user = await getUser(decoded.chave);
            const newToken = jwt.sign({id: user.idUser}, process.env.SERVERSECRET, {expiresIn: '5m'});

            if(process.env.MODE === 'development'){
                return res.header('authorization', newToken).send({login: true, userdata: refreshToken, tokenRouterVerify: newToken});
            }

            if(process.env.MODE === 'production'){
                return res.cookie('token', newToken, {
                    //secure: true, // Envia apenas em conexões HTTPS
                    httpOnly: true, // Não permite acesso via JavaScript
                    sameSite: 'Lax', // Restringe o envio do cookie ao mesmo site
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    signed: true,
                    overwrite: true,
                    domain: '192.168.0.21'
                }).json({ login: true, userdata: refreshToken, tokenRouterVerify: newToken });
            }
        }catch(error){
            return res.send({login: false, error: 'Token invalid.'});
        }
    });
}