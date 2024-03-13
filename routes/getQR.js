const express = require('express');
const route = express.Router();

const {logincheck} = require('../middleware');
const {getQR} = require('../controllers/getQR');


route.get('/:id',logincheck,getQR);

module.exports = route;