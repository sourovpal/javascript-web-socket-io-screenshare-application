const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    socket.sids = socket.rooms;

    socket.join(socket.request._query.user_id);
    socket.leave(socket.id);
    socket.id = socket.request._query.user_id;


    socket.on('message', (data)=>{
        io.to(data.id).emit('reply', data);
    });

    
    socket.on('disconnect', function() {
    });
});



server.listen(3000, ()=>{
    console.log('http://localhost:3000/')
});
