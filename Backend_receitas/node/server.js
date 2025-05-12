const express = require('express');
const router = require('./routes/Router.js');
const sequelize = require('./config/db');

const app = express();
app.use(express.json());
app.use(router);

  
app.listen(3000, async () => {
  await sequelize.sync();
  console.log('Servidor rodando na porta 3000');
});

