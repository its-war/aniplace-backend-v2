const mysql = require('mysql2');
module.exports = async (episodios, temporada, idAnime) => {
    const pool = mysql.createPool({
        host: process.env.MYSQLHOST,
        user: process.env.MYSQLUSER,
        password: process.env.MYSQLPASSWORD,
        port: process.env.MYSQLPORT,
        database: process.env.MYSQLDATABASE,
        connectionLimit: 12
    });

    const conn = await pool.promise().getConnection();
    try{
        for(const episodio of episodios){
            await conn.execute('insert into episodios (numero, temporada, linkOnline, link1080p, link720p, idAnime, registro) values (?,?,?,?,?,?,?)', [
                episodio.numero,
                temporada,
                episodio.linkOnline,
                episodio.link1080p,
                episodio.link720p,
                idAnime,
                episodio.registro
            ]);
        }
        return true;
    }catch {
        return false;
    }finally {
        conn.release();
    }
}