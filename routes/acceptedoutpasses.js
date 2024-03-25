const express = require('express');
const route = express.Router();

const {logincheck} = require('../middleware');
const {acceptedoutpasses} = require('../controllers/acceptedoutpasses');

route.get('/',logincheck,acceptedoutpasses);

module.exports = route; 