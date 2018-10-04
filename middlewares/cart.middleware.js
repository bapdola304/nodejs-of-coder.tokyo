var db = require('../db.js');
var product = require('../models/product.model');
module.exports.carts =  async function(req, res, next) {
var idproduct = req.params.idproduct;



var sessionId = req.cookies.sessionId;
var countCart = db.get('session').find({
    id: sessionId
}).get('cart').value();
if (!countCart) {
    res.locals.carts = 0;
    res.locals.infocarts = 0;
    console.log(res.locals.infocarts);
    next();
    return;
}
var a = [];
var b = [];
for (var key in countCart) {
    a.push(countCart[key]);
     b.push(key);
}

if(b !== null){
    var d = [];
	for(var i=0; i< b.length ;i++){
	d.push(await product.find({_id : b[i]}));
	d.push({"soluong" : a[i]});
	res.locals.infocarts = d;
	}
}

var carts = a.reduce(function(a, b) {
    return a + b;
});



res.locals.soluong = a;
res.locals.carts = carts;

next();

}