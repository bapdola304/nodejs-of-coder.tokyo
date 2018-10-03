var express = require('express');
var router = express.Router();
var db = require('../db.js');
var middleware = require('../middlewares/users.middleware');

var controller = require('../controllers/user.controller');
var login = require('../controllers/login.controller');

router.get('/', login.login );

router.post('/dologin',login.postlogin );
module.exports = router;