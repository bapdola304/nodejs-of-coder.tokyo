var express = require('express');
var router = express.Router();
var db = require('../db.js');
var middleware = require('../middlewares/users.middleware');

var controller = require('../controllers/cart.controller');


router.get('/add/:idproduct', controller.addCart);
router.get('/shop-cart', controller.shopcart);
router.get('/delcart/:id/:sl', controller.delcart);
module.exports = router;