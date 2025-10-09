const express = require('express');
const passport = require('passport');
const session = require('express-session');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const router = express.Router();

// Configuração do Passport.js para autenticação com Google
router.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());

// Configuração da estratégia do Google
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  // Aqui você pode salvar o usuário no banco de dados, se quiser
  console.log('Usuário logado:', profile.displayName);
  return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Rotas de autenticação
router.get('/login',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    successRedirect: '/profile'
  })
);

module.exports = router;