const express = require('express');
const route = express.Router();
const {studentview} = require('../controllers/studentview');


route.get('/',studentview);

module.exports = route;