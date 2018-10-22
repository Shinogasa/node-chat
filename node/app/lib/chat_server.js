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

function assignGuestName(socket, guestNumber, nickNames, nameUsed) {
    let name = 'Guest' + guestNumber;

    nickName[socket.id] = name;

    socket.emit('nameResult', {
        success: true,
        name: name
    });
    nameUsed.push(name);

    return guestNumber + 1;

}


function joinRoom(socket, room) {
    socket.join(room);

    currentRoom[socket.id] = room;

    socket.emit('joinResult', {room: room});

    socket.broadcast.to(room).emit('message', {
        text: nickNames[socket.id] + ' has joinbed ' + room + '.'
    });

    const usersInRoom = io.sockets.clients(room);

    if ( usersInRoom.length > 1 ) {
        const usersInRoomSummary = 'Users currently in ' + room + ': ';
        for ( const index in usersInRoom ) {
            const userSocketId = usersInRoom[index].id;
            if  ( userSocketId != socket.id ) {
                if ( index > 0 ) {
                    usersInRoomSummary += ', ';
                }
                usersInRoomSummary += nickNames[userSoxketId];
            }
        }
        usersInRoomSummary += '.';
        socket.emit('message', {text: usersInRoomSummary});
    }
 }