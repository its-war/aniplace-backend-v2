const conn = require('../../config/database');
module.exports = async (tabela, id, texto, idUser) => {
    return new Promise((resolve, reject) => {
        conn.query(
            `select *
                from ${tabela}
                 where id${tabela==='comentarios'?'Comentario':'Resposta'} and idUser=?`,
            idUser,
            (err, results, fields) => {
                if(err){
                    reject(err);
                }else{
                    if(results.length > 0){
                        let sql = '';
                        if(tabela === 'comentarios'){
                            sql = 'update comentarios set texto=?, editado=? where idComentario=?';
                        }else{
                            sql = 'update respostas set texto=?, editado=? where idResposta=?';
                        }
                        conn.query(sql, [texto, true, id], (err, result, fields) => {
                            if(err){
                                reject(err);
                            }else{
                                resolve(result.affectedRows > 0);
                            }
                        });
                    }else{
                        resolve(false);
                    }
                }
            }
        );
    });
}