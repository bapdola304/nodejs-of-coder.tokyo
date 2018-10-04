var product = require('../models/product.model');
var GioHang = require('../controllers/cart.js');
module.exports.addCart = function(req, res, next) {
var idproduct = req.params.idproduct;
// var sessionId = req.cookies.sessionId;

 
var giohang = new GioHang( (req.session.cart) ? req.session.cart : {items: {}} );
    
    product.findById(idproduct).then(function(data){
        giohang.add(idproduct, data);
        req.session.cart = giohang;
         res.locals.soluong = req.session.cart.totalQty;
        console.log(req.session.cart );
       res.redirect('/products');
    });
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


