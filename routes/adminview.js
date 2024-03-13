const express = require('express');
const route = express.Router();
const {logincheck} = require('../middleware');
const {adminview} = require('../controllers/adminview');

route.get('/',logincheck,adminview);

module.exports = route;