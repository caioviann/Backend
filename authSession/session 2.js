const express = require('express');
const session = require('express-session');

app = express();

app.use(session({
  secret: 'your-secret-key',  // Replace with a strong, unique key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Set to true in production with HTTPS
}));

app.post('/api/login', (req, res) => {
    // ... aqui deve-se fazer a autenticação ...
    req.session.userId = user.id;
    res.redirect('/api/receitas');
  });

  app.get('/api/receitas', (req, res) => {
    if (req.session.userId) {
      // usuário está logado !
      res.send('Bem-vindo às receitas !');
    } else {
      // usuário não está logado, então deve ser redircionado para login
      res.redirect('/api/login');
    }
 });

 app.get('/api/logout', (req, res) => {
    req.session.destroy(() => {
      res.redirect('/api/login');
    });
  });

  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });