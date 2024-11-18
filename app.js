const https = require('https');
const express = require('express');

const app = express();
const server = https.createServer(app);

const io = require('socket.io')(server, {
    cors: { origin: '*' }
});

app.use(express.static('public'));

let cache = [];

io.on('connection', (socket) => {
    console.log('Se ha conectado un cliente');
	
	
    socket.emit('chat_history', { cache: cache });
	
	
    socket.on('chat_message', (data) => {
        io.emit('chat_message', data);
        cache.push(data);
        cache = cache.slice(-20);
    });
});

server.listen(3000);
