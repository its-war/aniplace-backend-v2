const conn = require('../../config/database');
module.exports = async (dados) => {
    return new Promise((resolve, reject) => {
        conn.query(
            `
            INSERT INTO destaques SET ?
            `,
            dados,
            (err, result, fields) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result.insertId > 0);
                }
            }
        );
    });
}