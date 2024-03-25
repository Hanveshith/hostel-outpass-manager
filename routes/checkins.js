const express = require('express');
const route = express.Router();

const {logincheck} = require('../middleware');

const {checkins,fetchcheckins} = require('../controllers/checkins');

route.get('/',logincheck,checkins);
route.get('/:date',logincheck,fetchcheckins);

module.exports = route;