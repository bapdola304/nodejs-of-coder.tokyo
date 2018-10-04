var express = require('express');
var router = express.Router();
var db = require('../db.js');

var multer  = require('multer')
var upload = multer({ dest: 'public/uploads/' });

var controller = require('../controllers/product.controller');


router.get('/', controller.index);

router.get('/create',controller.create);
router.post('/create',upload.single('anhsp'), controller.postCreate);

router.post('/edit/:id',upload.single('anhsp'), controller.edit);

router.post('/search', controller.search);

module.exports = router;