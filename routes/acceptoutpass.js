const express = require("express");
const route = express.Router();

const {logincheck} = require('../middleware');
const {acceptoutpass} = require('../controllers/acceptoutpass');

route.get('/:id',logincheck,acceptoutpass)

module.exports = route;