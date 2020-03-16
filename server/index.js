const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const PORT = process.env.PORT || 5000;
const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket)=>{ // socket is an instnce of client instance
    console.log('We have a new connection...');

    socket.on('join', ({ name, room }, callback)=>{
        console.log(name, room);

        const error = true;
        if(error){
            callback({ error: 'Hello Aatif'})
        }

    })
    
    socket.on('disconnect', ()=>{
        console.log('User has left');
    })
})

// get the route
app.use(router);

server.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))