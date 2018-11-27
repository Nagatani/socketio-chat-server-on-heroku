import io from 'socket.io-client';

const socket = io('http://localhost:3000');

document.addEventListener('DOMContentLoaded', () => {

  document.querySelector('#chat-sender>button').addEventListener('click', (ev) => {
    ev.preventDefault();

    const txt = document.querySelector('#chat-text');

    if (txt.value != '') {
      socket.emit('chat message', txt.value);
    }
    txt.value = '';

    return false;
  });

  socket.on('connect', () => {
    console.log("connected to server : " + socket.connected); // true
  });

  socket.on('chat message', (msg) => {
    const messages = document.querySelector('#chat-message');

    //受け取ったメッセージを要素に変換して追加
    const newMessage = document.createElement('li');
    newMessage.textContent = msg;
    messages.appendChild(newMessage);

    // 最下部へスクロール
    messages.scrollTop = messages.scrollHeight;
  });
});
