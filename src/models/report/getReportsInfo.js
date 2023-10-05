const conn = require('../../config/database');
module.exports = async () => {
    return new Promise((resolve, reject) => {
        conn.query(
            `
                select 
                    COUNT(idReport) as totalReports,
                    SUM(CASE WHEN status = 0 THEN 1 ELSE 0 END) as pendentes
                from
                    report;
            `,
            (err, results, fields) => {
                if(err){
                    reject(err);
                }else{
                    resolve(results[0]);
                }
            }
        );
    });
}