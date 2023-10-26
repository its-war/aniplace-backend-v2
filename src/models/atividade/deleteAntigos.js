const conn = require('../../config/database');
module.exports = async (idUser) => {
    try {
        const recentActivityIds = await getRecentActivityIds(idUser);
        deleteOldActivities(idUser, recentActivityIds);
    } catch (err) {
        throw new Error('Erro ao deletar atividades do usuário: ' + err.message);
    }
}

async function getRecentActivityIds(idUser) {
    return new Promise((resolve, reject) => {
        conn.query(
            `SELECT idAtividade
             FROM atividade
             WHERE idUser = ? 
             ORDER BY registro DESC
             LIMIT 10;`,
            [idUser],
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    const recentIds = results.map((row) => row.idAtividade);
                    resolve(recentIds);
                }
            }
        );
    });
}

function deleteOldActivities(idUser, recentActivityIds) {
    conn.query(
        `DELETE
             FROM atividade
             WHERE idUser = ? 
             AND idAtividade NOT IN (?);`,
        [idUser, recentActivityIds],
        (err) => {
            if (err) {
                console.error(err);
            }
        }
    );
}