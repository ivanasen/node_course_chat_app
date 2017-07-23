require('./config/config');
const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const Message = require('./utils/message');
const LocationMessage = require('./utils/location-message');

const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', new Message('Admin', 'Welcome to the chat app!'));

    socket.broadcast.emit('newMessage', new Message('Admin', 'New user joined.'));
    
    socket.on('createMessage', (message) => {
        message.createdAt = new Date().getTime();
        io.emit('newMessage', message);
    });

    socket.on('createLocationMessage', (location) => {
        io.emit('newLocationMessage', new LocationMessage('Admin', location.latitude, location.longitude))
    });
    
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(process.env.PORT, () => {
    console.log(`App started on port ${process.env.PORT}`);
});