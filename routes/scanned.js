const express = require('express');
const route = express.Router();

const {logincheck} = require('../middleware');
const {scanned} = require('../controllers/scanned');

route.get('/:id',logincheck,scanned);

module.exports = route;
