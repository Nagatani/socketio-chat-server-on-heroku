import io from 'socket.io-client';

const socket = io();

// ページが読み込み終わったタイミングで処理を実行させる
document.addEventListener('DOMContentLoaded', () => {

  // Socket.ioに接続できたとき
  socket.on('connect', () => {
    console.log("connected to server : " + socket.connected); // true
  });

  // チャットの送信ボタンを押したときの処理を登録
  document.querySelector('#chat-sender>button').addEventListener('click', (ev) => {
    // デフォルトイベントキャンセル
    ev.preventDefault();

    // メッセージを取得
    const txt = document.querySelector('#chat-text');

    if (txt.value != '') {
      // Socket.ioに'chat message'を送信
      socket.emit('chat message', txt.value);
    }
    txt.value = '';

    return false;
  });

  // Socket.ioから'chat message'を受け取ったとき
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
