const conn = require('../../config/database');
const he = require('he');

module.exports = async (idComentario) => {
    return new Promise((resolve, reject) => {
        conn.query(
            `
            SELECT 
                r.idResposta, 
                r.texto, 
                r.registro, 
                r.editado,
                u.idUser AS idUsuarioResposta, 
                u.nome AS nomeUsuarioResposta, 
                u.foto AS fotoUsuarioResposta, 
                COUNT(l.idCurtida) AS totalCurtidas,
                GROUP_CONCAT(l.idUser) AS usuariosCurtiram
            FROM respostas r
            INNER JOIN user u ON r.idUser = u.idUser
            LEFT JOIN curtidas_respostas l ON r.idResposta = l.idResposta
            WHERE r.idComentario=?
            GROUP BY r.idResposta
        `,
            idComentario,
            (err, results, fields) => {
                if (err) {
                    reject(err);
                } else {
                    let respostas = [];
                    for (let i = 0; i < results.length; i++) {
                        const usuariosCurtiram = results[i].usuariosCurtiram ? results[i].usuariosCurtiram.split(',') : [];
                        respostas.push({
                            idResposta: results[i].idResposta,
                            texto: he.decode(results[i].texto),
                            registro: results[i].registro,
                            user: {
                                idUser: results[i].idUsuarioResposta,
                                nome: results[i].nomeUsuarioResposta,
                                foto: results[i].fotoUsuarioResposta
                            },
                            curtidas: {
                                total: parseInt(results[i].totalCurtidas) ?? 0,
                                users: usuariosCurtiram.map(Number) ?? []
                            },
                            editado: results[i].editado === 1
                        });
                    }
                    resolve(respostas);
                }
            }
        );
    });
};