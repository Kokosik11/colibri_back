const express = require('express');
const Router = express.Router();
const Controller = require('../controllers/user.controller');

const middleware = require('./middleware/auth');

// Router.post('/register', Controller.register);
Router.get('/login', Controller.login);
Router.get('/me', middleware.auth, Controller.me);

module.exports = Router;