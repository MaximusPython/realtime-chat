'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var socket_io_client_1 = require('socket.io-client');
var readline = require('readline');
var JWT_TOKEN = 'SECRET_KEY';
var socket = (0, socket_io_client_1.io)('http://localhost:3400', {
  auth: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODdmNmYyZDEwYmQ4NTVjMTU4NTI2MzUiLCJpYXQiOjE3NTMxODE5OTcsImV4cCI6MTc1MzE4NTU5N30.jKdHZ0ZwAlhzO3z8s4F1BqTFtdzE-oixq3kaJgnjQWs',
  },
});
socket.on('connect', function () {
  console.log('Подключено, id сокета:', socket.id);
  // Присоединяемся к комнате
  socket.emit('joinRoom', 'room1');
  // Отправляем тестовое сообщение
  var msg = { roomId: 'room1', text: 'Привет из клиента на TS!' };
  socket.emit('message', msg);
});
socket.on('message', function (msg) {
  console.log('Новое сообщение:', msg);
});
socket.on('connect_error', function (err) {
  console.error('Ошибка подключения:', err.message);
});
socket.on('disconnect', function (reason) {
  console.log('Отключено:', reason);
});
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '',
});
rl.on('line', function (line) {
  var text = line.trim();
  if (!text) return;
  socket.emit('message', { roomId: 'room1', text: text });
});
