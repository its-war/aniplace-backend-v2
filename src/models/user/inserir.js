const conn = require('../../config/database');
module.exports = async (user) => {
    return new Promise((resolve, reject) => {
        conn.query('insert into user set ?', user, (err, result, fields) => {
            if(err){
                reject(err);
            }else{
                if(result.insertId){
                    resolve({idUser: result.insertId, success: true});
                }else{
                    resolve({success: false});
                }
            }
        });
    });
}