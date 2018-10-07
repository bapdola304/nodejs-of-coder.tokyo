var product = require('../models/product.model');
var GioHang = require('../controllers/cart.js');
module.exports.addCart = function(req, res, next) {
var idproduct = req.params.idproduct;
// var sessionId = req.cookies.sessionId;

 
var giohang = new GioHang( (req.session.cart) ? req.session.cart : {items: {}} );
    
    product.findById(idproduct).then(function(data){
        giohang.add(idproduct, data);
        req.session.cart = giohang;
  
       console.log(req.session.cart);
       res.redirect('/products');
    });
}

module.exports.shopcart = function(req, res){
	if(!req.session.cart){
		res.render('products/shop-cart',{products : null});
		return;
	}
	var giohang = new GioHang(req.session.cart);
	var price = giohang.getcart();
	var tongtien = price.reduce(function(a,b){
		return a + b.tien;
	},0);
	res.render('products/shop-cart',{products : giohang.getcart(), totalPrice :tongtien});
}
module.exports.delcart = function(req, res){
	var id = req.params.id;

	var giohang = new GioHang( (req.session.cart) ? req.session.cart : {items: {}} );

	giohang.delCart(id);
	req.session.cart = giohang;
	var products = giohang.getcart();
	var tongtien = products.reduce(function(a,b){
		return a + b.tien;
	},0);
	 res.render('products/del-cart',{products : products, tongtien: tongtien});
}

module.exports.delete = function(req, res){
	var id = req.params.id;

	var giohang = new GioHang( (req.session.cart) ? req.session.cart : {items: {}} );

	giohang.delCart(id);
	res.redirect('/cart/shop-cart');
}

module.exports.update = function(req, res){
	var id = req.params.id;
	var sl = req.params.sl;

	var giohang = new GioHang( (req.session.cart) ? req.session.cart : {items: {}} );

	giohang.updateCart(id,sl);
	res.redirect('/cart/shop-cart');
}
// if (!sessionId) {
//     res.redirect('/products');
//     return;
// }
// var count = db.get('session').find({
//     id: sessionId
// }).get('cart.' + idproduct, 0).value();
// db.get('session')
//     .find({
//         id: sessionId
//     })
//     .set('cart.' + idproduct, count + 1)
//     .write();


// //res.locals.carts = carts;


