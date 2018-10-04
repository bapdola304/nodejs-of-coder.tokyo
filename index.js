var express = require('express');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/express-demo');

var session = require('express-session');
var userRouter = require('./routes/users.route.js');

var productRouter = require('./routes/product.router.js');
//var session = require('./middlewares/session.middleware');
var loginRouter = require('./routes/login.router.js');
var middlewareLogin = require('./middlewares/login.middleware');
var middlewareCart = require('./middlewares/cart.middleware');

var cart = require('./routes/cart.route.js');
var controller = require('./controllers/cart.controller');
app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'));
app.use(cookieParser());
//app.use(session);
app.use(session({
  secret: 'ngohung',
  resave: false,
  saveUninitialized: true
}))

app.use(function(req, res, next){
	res.locals.session = req.session;
	// console.log(res.locals.soluong);
	next();
});

// app.get('/',function(req,res){
// 	res.render('index',{title : 'Coder.tokyo'});
// });

app.use('/users', middlewareLogin.middlewareCookie, userRouter);
app.use('/products', productRouter); //controller.carts
app.use('/login', loginRouter);
app.use('/cart',cart )
app.listen(port,function(){
	//console.log('port : ' + port);
});