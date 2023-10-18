const conn = require('../../config/database');
module.exports = async () => {
    return new Promise((resolve, reject) => {
        conn.query(
            `select idUser, nome
             from user
             order by atividade desc, idUser
             limit 9`,
            (err, result, fields) => {
                if(err){
                    reject(err);
                }else{
                    const users = result.map(u => ({
                        idUser: u.idUser,
                        nome: u.nome
                    }));
                    resolve(users);
                }
            }
        );
    });
}