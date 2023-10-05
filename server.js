//TimeZone para São Paulo
process.env.TZ = 'America/Sao_Paulo';

//Importações Principais
const express = require('express');
const cookieParser = require('cookie-parser');
require('express-async-errors');
require('dotenv-safe').config();
const router = require('./src/router');
const proxy = require('proxy-addr');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: ["http://localhost:3000", "http://192.168.0.22:3000"],
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
    },
    allowEIO3: true
});
const cors = require('cors');
const path = require("path");
const bodyParser = require('body-parser');
const datahora = require('./src/plugins/datahora');
const connectionDatabase = require('./src/config/database');

//Configurações
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
    origin: [
        'http://192.168.0.22:8080',
        'http://192.168.0.22:3000',
        'http://localhost:3000',
        'http://localhost:8080'
    ],
    credentials: true
}));
app.use(cookieParser(process.env.COOKIESECRET));
app.use(express.static(path.join(__dirname, "public")));
app.set('trust proxy', true);
const porta = process.env.SERVERPORT || 80;

app.use((req, res, next) => {
    req.io = io;
    req.proxy = proxy;
    next();
});

//Setando o roteador no servidor
app.use('/api', router);

//Middleware de erro do Express
app.use((err, req, res, next) => {
    console.log('Erro na API: ' + err);
    return res.json({
        status: "Erro"
    });
});

app.get("/", function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});
app.get("*", (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

const activeUsers = new Set();
io.on('connection', (socket) => {
    activeUsers.add(socket.id);

    socket.on('acessoAnime', (idAnime) => {
        const incrementarAcessos = require('./src/models/animes/incrementarAcesso');
        incrementarAcessos(idAnime);
    });

    socket.on('acessoEpisodio', (idEpisodio) => {
        const incrementarAcessos = require('./src/models/episodios/incrementarAcessos');
        incrementarAcessos(idEpisodio);
    });

    socket.on('getActiveUsers', () => {
        socket.emit('getActiveUsers', activeUsers.size);
    });

    socket.on('disconnect', () => {
        activeUsers.delete(socket.id);
        socket.emit('getActiveUsers', activeUsers.size);
    });
});

setInterval(() => {
    connectionDatabase.ping((err) => {
        if (err) {
            console.error('Erro no ping do banco de dados:', err);
        }
    });
    let currentTime = Date.now();
    let query = `DELETE FROM captcha WHERE registro + validade < ${currentTime}`;
    connectionDatabase.query(query);
}, 1000 * 60 * 30);

server.listen(porta, () => {
    if(process.env.MODE === 'development'){
        console.clear();
    }
    console.log("Servidor iniciado na porta " + porta + " em " + datahora.getData() + " às " + datahora.getHora());
});