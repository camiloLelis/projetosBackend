const port = process.env.PORT || 3001;
const socketio = require('socket.io');
const http = require('http');
const app = require('./app');

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'], 
  },
});

require('../socket')(io);

server.listen(port);
console.log(`Api rodando na porta ${port}`);
