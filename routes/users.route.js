var express = require('express');
var router = express.Router();

var multer  = require('multer')
var upload = multer({ dest: 'public/uploads/' });


var db = require('../db.js');
var middleware = require('../middlewares/users.middleware');
var controller = require('../controllers/user.controller');
router.get('/', controller.index);

router.get('/search',controller.search);

router.get('/create', controller.create);
router.post('/create',  upload.single('avatar'), middleware.middlewareKiemTra, controller.postCreate);
router.get('/delete/:key',function(req, res){
	db.get('users').remove({ name: req.params.key }).write();
	res.redirect('/users');
});
module.exports = router;