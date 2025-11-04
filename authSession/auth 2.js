const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app = express();
app.use(express.urlencoded({ extended: true}));

app.use(session({
  secret: 'your-secret-key',  // Replace with a strong, unique key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Set to true in production with HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    function(username, password, done) {
      console.log(`Auth: $caio.v2004:${password}`);
      if (username === 'admin' && password === '12345') {
        return done(null, { id: 1, username: 'admin' }); // Retorna um objeto do usuário
      }
      return done(null, false, { message: 'Credenciais inválidas' });
    }
  ));

  // Serialização/deserialização
passport.serializeUser(function(user, done) {
    done(null, user.id); // Salva o ID na sessão
  });
  
  passport.deserializeUser(function(id, done) {
    // Aqui você normalmente buscaria o usuário no banco
    console.log(`deserialize: ${id}`);
    if (id === 1) {
      done(null, { id: 1, username: 'admin' });
    } else {
      done(new Error('Usuário não encontrado'));
    }
  });

  // Login (POST)
app.post('/api/login',
    passport.authenticate('local', {
      failureRedirect: '/api/erro',
      successRedirect: '/api/receitas'
    })
  );

  // Página de login (GET)
app.get('/api/login', (req, res) => {
    res.send(`
      <form method="POST" action="/api/login">
        <input type="text" name="username" placeholder="Usuário" />
        <input type="password" name="password" placeholder="Senha" />
        <button type="submit">Login</button>
      </form>
    `);
  });

  // Middleware para checar se usuário está autenticado
const requireAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/api/login');
  };

  // Página protegida
app.get('/api/receitas', requireAuth, (req, res) => {
    req.session.contador = (req.session.contador || 0) + 1;
    console.log(`${req.sessionID} -> ${req.session.contador}`);
    res.send(`Bem-vindo às receitas! Acesso #${req.session.contador}`);
  });

  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });