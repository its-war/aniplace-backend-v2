const conn = require('../../config/database');
module.exports = async (idEpisodio, link, ova) => {
    return new Promise((resolve, reject) => {
        conn.query(
            `UPDATE episodios
             SET link1080p = ?, link720p = ?, linkOnline = ?, ova = ?
             WHERE idEpisodio = ?;`,
            [link, link, link, ova, idEpisodio],
            (err, result, fields) => {
                if(err){
                    reject(err);
                }else{
                    resolve(result.affectedRows > 0);
                }
            }
        );
    });
}