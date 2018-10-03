var db = require('../db.js');

module.exports.carts = function(req, res, next) {

// vidproduct = req.params.idproduct;
var sessionId = req.cookies.sessionId;
var countCart = db.get('session').find({
    id: sessionId
}).get('cart').value();
if (!countCart) {
    res.locals.carts = 0;
    next();
    return;
}
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