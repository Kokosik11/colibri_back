const express = require('express');
const Router = express.Router();
const Controller = require('../controllers/bid.controller');
const csrf = require('csurf');

Router.post('/create', csrf({ cookie: true }), Controller.create);
Router.get('/csrftoken', Controller.csrfToken);
Router.get('/', Controller.getAll);

module.exports = Router;