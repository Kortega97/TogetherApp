
// TODO: VALIDATE INPUT NO SPACING IN CHAT NAME
// TO LOWER CASE
// ADD REQIRED FOR GROUP INPUTS

const socket = io();

// event listeners here for the input
let messages = document.getElementById('messages')
var form = document.getElementById('form');
var input = document.getElementById('input');

let userName = prompt('What do we call you?')

socket.emit('new user', messages.dataset.chatRoom)

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
      printChatMsg(userName + ": " + input.value)
      socket.emit('chat message',messages.dataset.chatRoom, userName + ": " + input.value);
      input.value = '';
    }
  });
  function printChatMsg(msg){
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  }
  
  socket.on('chat message', function(msg) {
    printChatMsg(msg)
  });
