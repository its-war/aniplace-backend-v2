const conn = require('../../config/database');
const he = require('he');

module.exports = async (tipo, idOrigem, ordem) => {
    return new Promise((resolve, reject) => {
        let sql = `
            SELECT 
                c.idComentario, 
                c.texto, 
                c.registro, 
                c.editado,
                u.idUser AS idUsuarioComentario, 
                u.nome AS nomeUsuarioComentario, 
                u.foto AS fotoUsuarioComentario, 
                COUNT(l.idCurtida) AS totalCurtidas,
                GROUP_CONCAT(l.idUser) AS usuariosCurtiram
            FROM comentarios c
            INNER JOIN user u ON c.idUser = u.idUser
            LEFT JOIN curtidas_comentarios l ON c.idComentario = l.idComentario
            WHERE c.tipo = ? AND c.idOrigem = ?
            GROUP BY c.idComentario
        `;

        if (parseInt(ordem) === 2) {
            sql += ' ORDER BY c.idComentario DESC';
        }

        conn.query(
            sql,
            [tipo, idOrigem],
            (err, results, fields) => {
                if (err) {
                    reject(err);
                } else {
                    let comentarios = [];
                    for (let i = 0; i < results.length; i++) {
                        const usuariosCurtiram = results[i].usuariosCurtiram ? results[i].usuariosCurtiram.split(',') : [];
                        comentarios.push({
                            idComentario: results[i].idComentario,
                            texto: he.decode(results[i].texto),
                            registro: results[i].registro,
                            user: {
                                idUser: results[i].idUsuarioComentario,
                                nome: results[i].nomeUsuarioComentario,
                                foto: results[i].fotoUsuarioComentario,
                            },
                            curtidas: {
                                total: parseInt(results[i].totalCurtidas) ?? 0,
                                users: usuariosCurtiram.map(Number) ?? []
                            },
                            editado: results[i].editado === 1
                        });
                    }
                    resolve(comentarios);
                }
            }
        );
    });
};