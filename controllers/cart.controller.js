var db = require('../db.js');

module.exports.addCart = function(req, res, next) {
var idproduct = req.params.idproduct;
var sessionId = req.cookies.sessionId;

if (!sessionId) {
    res.redirect('/products');
    return;
}
var count = db.get('session').find({
    id: sessionId
}).get('cart.' + idproduct, 0).value();
db.get('session')
    .find({
        id: sessionId
    })
    .set('cart.' + idproduct, count + 1)
    .write();


//res.locals.carts = carts;
res.redirect('/products');
}
module.exports.carts = function(req, res, next) {

var idproduct = req.params.idproduct;
var sessionId = req.cookies.sessionId;
var countCart = db.get('session').find({
    id: sessionId
}).get('cart').value();

var a = [];
for (var key in countCart) {
    a.push(countCart[key]);
}


var carts = a.reduce(function(a, b) {
    return a + b;
});




res.locals.carts = carts;
next();

}