const express = require('express');
const route = express.Router();

const {logincheck} = require('../middleware');
const {rejectedoutpasses} = require('../controllers/rejectedoutpasses');

route.get('/',logincheck,rejectedoutpasses);

module.exports = route; 