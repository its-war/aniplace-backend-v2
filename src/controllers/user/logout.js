module.exports = async (req, res) => {
    if(process.env.MODE === 'development'){
        return res.header('authorization', '').send({logout: true, userdata: '', tokenRouterVerify: '', userBasicData: null});
    }else{
        req.headers['authorization'] = '';
        return res.cookie('token', '', { expires: new Date(0) }).json({logout: true});
    }
}