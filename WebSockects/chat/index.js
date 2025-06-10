const express = require('express');
const expressWs = require('express-ws');
const path = require('path');

const app = express();

// Usa o middleware express-ws, que implementa websocket
expressWs(app);

// define que a pasta "public" contém conteúdo estático (ali fica a página html do cliente)
app.use(express.static(path.join(__dirname, 'public')));

const connection = new Set();
// configura um endpoint para websocket na URI /ws. A função callback passada por parâmetro define
// o que deve ser feito em dois casos usando a função ws.on: 
// 'message': quando recebe uma mensagem de um cliente
// 'close': quando um cliente desconecta
// Quando um cliente conecta a callback é executadam define os tratadores de eventos 'mesasge' e 'close', e então
// envia uma mensagem de boas-vindas ao cliente
app.ws('/ws', (ws, req) => {
    ws.on('name', name =>{
        console.log('teste'+ name);
    });

  ws.on('message', msg => {
    console.log(`Recebeu mensagem: ${msg}`);
    connection.forEach((_sock, pos) => {_sock.send(msg);});
    //ws.send(`Servidor recebeu: ${msg}`);
  });

  ws.on('close', () => {
    console.log('Cliente desconectou');
    connection.delete(ws);
  });

  //ws.send('Benvindo ao servidor websocket !');
  connection.add(ws);
});

app.listen(8080, () => {
  console.log('Servidor iniciou no port 8080');
});