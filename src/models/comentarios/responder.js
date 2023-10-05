const conn = require('../../config/database');
const he = require('he');
module.exports = async (texto, idComentario, idUser) => {
    return new Promise((resolve, reject) => {
        conn.query(
            `insert into respostas (texto, idComentario, idUser) values (?,?,?)`,
            [texto, idComentario, idUser],
            (err, result, fields) => {
                if(err){
                    reject(err);
                }else{
                    conn.query(
                        `select r.idResposta, r.texto, r.registro, u.idUser, u.nome, u.foto
                            from respostas r
                            inner join user u on r.idUser = u.idUser
                            where idResposta=?`,
                        result.insertId,
                        (err, results, fields) => {
                            if(err){
                                reject(err);
                            }else{
                                let resposta = {
                                    idResposta: results[0].idResposta,
                                    texto: he.decode(results[0].texto),
                                    registro: results[0].registro,
                                    user: {
                                        idUser: results[0].idUser,
                                        nome: results[0].nome,
                                        foto: results[0].foto
                                    },
                                    curtidas: {
                                        total: 0,
                                        users: []
                                    },
                                    editado: false
                                }
                                resolve(resposta);
                            }
                        }
                    );
                }
            }
        );
    });
}