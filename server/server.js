require('./config/config');
const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const Message = require('./utils/message');
const LocationMessage = require('./utils/location-message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');


const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('join', (params, callback) => {
        if (!isRealString(params['?name']) || !isRealString(params['room'])) {
            return callback('Name and room name are required');
        }

        socket.join(params.room);
        users.remove(socket.id);
        users.add(socket.id, params['?name'], params['room']);

        io.to(params.room).emit('updateUserList', users.getAllInRoom(params.room));

        //greet user
        socket.emit('newMessage', new Message('Admin', 'Welcome to the chat app!'));
        socket.broadcast.to(params.room).emit('newMessage', new Message('Admin', `${params["?name"]} joined.`));

        callback();
    });

    socket.on('createMessage', (message) => {
        message.createdAt = new Date().getTime();
        io.emit('newMessage', message);
    });

    socket.on('createLocationMessage', (location) => {
        io.emit('newLocationMessage', new LocationMessage('Admin', location.latitude, location.longitude))
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
        const user = users.remove(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getAllInRoom());
            io.to(user.room).emit('newMessage', new Message('Admin', `${user.name} left the room.`));
        }
    });
});

server.listen(process.env.PORT, () => {
    console.log(`App started on port ${process.env.PORT}`);
});