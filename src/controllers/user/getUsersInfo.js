const getUsersInfo = require('../../models/user/getUsersInfo');
module.exports = async (req, res) => {
    try{
        let dados = await getUsersInfo();
        return res.send({totalUsers: dados.totalUsers, usersBanidos: dados.usersBanidos});
    }catch{
        return res.send({totalUsers: 0, usersBanidos: 0});
    }
}