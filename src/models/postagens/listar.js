const conn = require('../../config/database');
const he = require('he');
module.exports = async (pagina = 1) => {
    if(typeof pagina !== 'number'){
        pagina = parseInt(pagina);
    }
    return new Promise(async (resolve, reject) => {
        let offset = (pagina - 1) * 10;
        conn.query(
            `select p.idPostagem, p.texto, p.imagem, p.registro,
                    u.idUser, u.nome, u.foto,
                    COUNT(c.idCurtida) as totalCurtidas,
                    GROUP_CONCAT(c.idUser) as usuarios
            from postagens p 
                inner join user u on p.idUser = u.idUser 
                left join curtidas_postagens c on p.idPostagem = c.idPostagem
            group by p.idPostagem
            order by p.idPostagem desc
            limit ? offset ?`,
            [10, offset],
            async (err, results, fields) => {
                if(err){
                    reject(err);
                }else{
                    const postagens = results.map(p => ({
                        idPostagem: p.idPostagem,
                        texto: p.texto ? he.decode(p.texto) : p.texto,
                        imagem: p.imagem,
                        registro: p.registro,
                        user: {
                            idUser: p.idUser,
                            nome: p.nome,
                            foto: p.foto
                        },
                        curtidas: {
                            total: parseInt(p.totalCurtidas) ?? 0,
                            users: p.usuarios ? p.usuarios.split(',').map(Number) ?? [] : []
                        }
                    }));
                    resolve({postagens: postagens, totalPaginas: await getTotalPages()});
                }
            }
        );
    });
}

function getTotalPages(){
    return new Promise((resolve, reject) => {
        conn.query(
            `select COUNT(*) as total from postagens`,
            (err, result, fields) => {
                if(err){
                    reject(err);
                }else{
                    resolve(Math.ceil(result[0].total / 10));
                }
            }
        );
    });
}