require('./config/config');
const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'Pesho123',
        text: 'EEeeeeee gosho be',
        createdAt: 123
    });

    socket.on('createMessage', (message) => {
        message.createdAt = new Date();
        socket.emit('newMessage', message);
    });
    
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(process.env.PORT, () => {
    console.log(`App started on port ${process.env.PORT}`);
});