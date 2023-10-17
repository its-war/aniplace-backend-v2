const conn = require('../../config/database');
const he = require('he');
module.exports = async (idPostagem) => {
    return new Promise((resolve, reject) => {
        conn.query(
            `select p.idPostagem, p.texto, p.imagem, p.registro,
                    u.idUser, u.nome, u.foto,
                    COUNT(c.idCurtida) as totalCurtidas,
                    GROUP_CONCAT(c.idUser) as usuarios
             from postagens p 
                inner join user u on p.idUser = u.idUser
                left join curtidas_postagens c on p.idPostagem = c.idPostagem
             where p.idPostagem=?`,
            idPostagem,
            (err, result, fields) => {
                if(err){
                    reject(err);
                }else{
                    const postagem = {
                        idPostagem: result[0].idPostagem,
                        texto: result[0].texto ? he.decode(result[0].texto) : result[0].texto,
                        imagem: result[0].imagem,
                        registro: result[0].registro,
                        user: {
                            idUser: result[0].idUser,
                            nome: result[0].nome,
                            foto: result[0].foto
                        },
                        curtidas: {
                            total: parseInt(result[0].totalCurtidas) ?? 0,
                            users: result[0].usuarios ? result[0].usuarios.split(',').map(Number) ?? [] : []
                        }
                    }
                    resolve(postagem);
                }
            }
        );
    });
}