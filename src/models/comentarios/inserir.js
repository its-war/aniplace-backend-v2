const conn = require('../../config/database');
const he = require('he');
module.exports = async (texto, tipo, idOrigem, idUser) => {
    return new Promise((resolve, reject) => {
        conn.query(
            `insert into comentarios (texto, tipo, idOrigem, idUser) values (?,?,?,?)`,
            [texto, tipo, idOrigem, idUser],
            (err, result, fields) => {
                if(err){
                    reject(err);
                }else{
                    conn.query(
                        `select c.idComentario, c.texto, c.registro, u.idUser, u.nome, u.foto
                            from comentarios c
                            inner join user u on c.idUser = u.idUser
                             where idComentario=?`,
                        result.insertId,
                        (err, results, fields) => {
                            if(err){
                                reject(err);
                            }else{
                                let comentario = {
                                    idComentario: results[0].idComentario,
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
                                resolve(comentario);
                            }
                        }
                    );
                }
            }
        );
    });
}