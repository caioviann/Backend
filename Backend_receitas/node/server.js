const express = require('express');
const routes = require('./routes/RecipeRouter.js');
const sequelize = require('./config/db');

const app = express();
app.use(routes);

  
app.listen(3000, async () => {
  await sequelize.sync();
  console.log('Servidor rodando na porta 3000');
});

