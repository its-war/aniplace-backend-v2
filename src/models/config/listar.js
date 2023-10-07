const conn = require('../../config/database');
module.exports = async () => {
    return new Promise((resolve, reject) => {
        conn.query(
            `select * from configs`,
            (err, result, fields) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result[0]);
                }
            }
        );
    });
}