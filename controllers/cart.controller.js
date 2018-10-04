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
