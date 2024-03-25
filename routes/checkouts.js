const express = require('express');
const route = express.Router();

const {logincheck} = require('../middleware.js');

const {checkouts,fetchcheckouts} = require('../controllers/checkouts.js');

route.get('/',logincheck,checkouts);
route.get('/:date',logincheck,fetchcheckouts);

module.exports = route;