const conn = require('../../config/database');
module.exports = async (filtros = {letra: false, ano: false, disponibilidade: false, audio: false, status: false, generos: false}, pagina = 1) => {
    let sql = 'select * from animes';
    let sqlPages = 'select COUNT(*) AS total from animes';

    let contador = contarFiltros(filtros);
    let conditions = [];
    let params = [];
    if(contador > 0){
        sql = sql + ' WHERE ';
        sqlPages = sqlPages + ' WHERE ';

        if(filtros.letra){
            if(filtros.letra === '#'){
                conditions.push("nome REGEXP '^[^a-zA-Z]'");
            }else{
                conditions.push(`SUBSTRING(nome, 1, 1) = ?`);
                params.push(filtros.letra);
            }
        }

        if(filtros.ano){
            conditions.push('ano = ?');
            params.push(filtros.ano);
        }

        if(filtros.disponibilidade){
            conditions.push('disponibilidade = ?');
            params.push(filtros.disponibilidade);
        }

        if(filtros.audio){
            conditions.push('audio = ?');
            params.push(filtros.audio);
        }

        if(filtros.status){
            conditions.push('status = ?');
            params.push(filtros.status);
        }

        if(filtros.generos){
            let generos = filtros.generos.split(',');
            let generosConditions = [];
            let generosParams = [];
            for(let i = 0; i < generos.length; i++){
                generosConditions.push(`FIND_IN_SET(?, generos) > 0`);
                generosParams.push(generos[i]);
            }
            conditions.push(generosConditions.join(' AND '));
            params.push(...generosParams);
        }

        sql = sql + conditions.join(' AND ');
        sqlPages = sqlPages + conditions.join(' AND ');
    }
    const perPage = 15;
    const offset = (pagina - 1) * perPage;
    sql = sql + ' ORDER BY nome LIMIT ' + perPage + ' OFFSET ' + offset;
    let totalResultados = await new Promise((resolve, reject) => {
        conn.query(sqlPages, params, (err, result, fields) => {
            if(err){
                reject(err);
            }else{
                resolve(result[0].total);
            }
        });
    });
    const totalPaginas = Math.ceil(totalResultados / perPage);

    if(pagina > totalPaginas){
        return [];
    }

    return await new Promise((resolve, reject) => {
        conn.query(sql, params, (err, results, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve({animes: results, total: totalPaginas});
            }
        });
    });
}

function contarFiltros(filtros){
    let i = 0;
    if(filtros.letra){
        i++;
    }
    if(filtros.ano){
        i++;
    }
    if(filtros.disponibilidade){
        i++;
    }
    if(filtros.audio){
        i++;
    }
    if(filtros.status){
        i++;
    }
    if(filtros.generos){
        i++;
    }
    return i;
}