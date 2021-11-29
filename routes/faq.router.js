const express = require('express');
const Router = express.Router();
const Controller = require('../controllers/faq.controller');

Router.post('/create', Controller.create);
Router.get('/', Controller.getAll);

module.exports = Router;