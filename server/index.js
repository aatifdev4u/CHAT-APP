const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const PORT = process.env.PORT || 5000;
const router = require('./router');
const { 
    addUser,
    getUsersInRoom,
    removeUser,
    getUser
} = require('./users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket)=>{ // socket is an instnce of client instance
    console.log('We have a new connection...');
    socket.on('join', ({ name, room }, callback)=>{
        const { error, user } = addUser({ id: socket.id, name, room });

        if(error) return callback(error);

        socket.emit('message', { user: 'admin', text: `${user.name} welcome to the room ${user.room}`})
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!`})

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        socket.join(user.room);

        callback();

    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message});
        callback();
    })
    
    socket.on('disconnect', ()=>{
        console.log('User has left');
        const user = removeUser(socket.id);

        if(user) {
          io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
          io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }
    })
})

// get the route
app.use(router);

server.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))
