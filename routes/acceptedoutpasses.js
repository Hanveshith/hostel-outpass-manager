const express = require('express');
const route = express.Router();

const {islogined} = require('../middleware');
const {acceptedoutpasses} = require('../controllers/acceptedoutpasses');

route.get('/',islogined,acceptedoutpasses);

module.exports = route; 