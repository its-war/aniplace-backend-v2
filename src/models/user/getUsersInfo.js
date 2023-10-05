const conn = require('../../config/database');
module.exports = async () => {
    return new Promise((resolve, reject) => {
        conn.query(`
            select
                COUNT(idUser) as totalUsers,
                SUM(CASE WHEN status = 0 THEN 1 ELSE 0 END) AS usersBanidos
            from
                user;`,
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