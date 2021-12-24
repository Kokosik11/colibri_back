const express = require('express');
const Router = express.Router();
const Controller = require('../controllers/project.controller');
const multer  = require("multer");
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "static/uploads/projects")
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
  })
  
const upload = multer({ storage });

Router.post('/create', upload.single("project-img"), Controller.create);
Router.get('/', Controller.getAll);

module.exports = Router;