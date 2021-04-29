module.exports = function(io) {
  // make socketio listen
  io.on('connection', socket => {
    // TODO:ADD USERS TO GROUPS
    socket.on('new user', (room) => {
      socket.join(room)
      socket.to(room).broadcast.emit('chat message', 'CONNECTED');
    });
    //make the message emmit to everyone
      socket.on('chat message', (room,msg) => {
        socket.to(room).broadcast.emit('chat message', msg);
        
      });
    // send message on disconnect
    socket.on('disconnect', () => {
      socket.emit('a user has disconnected')
      
    })
  })
 
 };
