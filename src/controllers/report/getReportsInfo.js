const getReportsInfo = require('../../models/report/getReportsInfo');
module.exports = async (req, res) => {
    try{
        let dados = await getReportsInfo();
        return res.send({totalReports: dados.totalReports, pendentes: dados.pendentes});
    }catch{
        return res.send({totalReports: 0, pendentes: 0});
    }
}