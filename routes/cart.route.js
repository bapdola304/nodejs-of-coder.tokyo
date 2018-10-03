var express = require('express');
var router = express.Router();
var db = require('../db.js');
var middleware = require('../middlewares/users.middleware');

var controller = require('../controllers/cart.controller');


router.get('/add/:idproduct', controller.addCart);


module.exports = router;