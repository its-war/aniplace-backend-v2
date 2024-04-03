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
        origin: process.env.SERVERDOMINIO.split(','),
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
    origin: process.env.SERVERDOMINIO.split(','),
    credentials: true
}));
app.use(cookieParser(process.env.COOKIESECRET));
app.use(express.static(path.join(__dirname, "public")));
app.set('trust proxy', true);
const porta = process.env.SERVERPORT || 80;//TODO: resolver erro na api: SyntaxError: Unexpected non-whitespace character after JSON at position 790

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

const setUserActivity = require('./src/models/user/setActivity');
const setAtividadeUserAnimeView = require('./src/controllers/user/setUserAtividade');
const activeUsers = new Set();
const NodeCache = require('node-cache');
const userCache = new NodeCache({stdTTL: 30 * 60});
io.on('connection', (socket) => {
    activeUsers.add(socket.id);

    socket.on('getActiveUsers', () => {
        socket.emit('getActiveUsers', activeUsers.size);
    });

    socket.on('userActivity', (idUser) => {
        if (userCache.has(idUser)) {
            const currentValue = userCache.get(idUser);
            userCache.set(idUser, currentValue + 1);

            if (currentValue >= 20) {
                const valor = userCache.take(idUser);
                setUserActivity(idUser, valor);
            }
        } else {
            userCache.set(idUser, 1);
        }
    });

    socket.on('userAtividadeAnimeView', (idUser, idAnime) => {
        setAtividadeUserAnimeView(idUser, idAnime);
    });

    socket.on('disconnect', () => {
        activeUsers.delete(socket.id);
        socket.emit('getActiveUsers', activeUsers.size);
    });
});

userCache.on("expired", (key, value) => {
    key = parseInt(key);
    if(typeof key === 'number'){
        setUserActivity(key, value);
    }
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