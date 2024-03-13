const express = require('express');
const route = express.Router();

const {logincheck} = require('../middleware');
const {requestoutpass,requestverify} = require('../controllers/requestoutpass');

route.get('/',logincheck,requestoutpass);
route.post('/',logincheck,requestverify);

module.exports = route;