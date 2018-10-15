const socketio = require('socket.io');
let io;
let guestNumber = 1;
let nickNames;
let namesUsed = [];
let currentRoom;

exports.listen = (server) => {

    io = socketio.listen(server);

    io.set('log level', 1);

    io.sockets.on('connection', (socket) => {

        guestNumber = assignGuestName(socket, guestNumber, ?nickNames, nameUsed);

        joinRoom(socket, 'Lobby');

        handleMessageBroadcasting(socket, nickNames);

        handleNameChangeAttempts(socket, nickNames, namesUsed);

        handleRoomJoining(socket);

        socket.on('rooms', () => {
            socket.emit('rooms', io.sockets.manager.rooms);
        });

        handleClientDisconnection(socket, nickNames, nameUsed);
    });
};