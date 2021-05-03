const path = require('path');
const express = require('express');
const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// start the server
const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});

// websockets
const socketIo = require('socket.io');
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('new connection', socket.id);

    socket.on('player', (data) => {
        io.sockets.emit('server_msg', data);
    })
});



