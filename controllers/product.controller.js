
var db = require('../db.js');

var product = require('../models/product.model');
module.exports.index = function(req, res) {
// var page = req.query.page || 1;
// var item = 8;
// var sotrang = db.get('products').size();
// var start = (page - 1) *item;
// var end = page*item;
// // res.render('products/index',{products : db.get('products').value().slice(start,end)});
// res.render('products/index',
// 	{
// 		products : db.get('products').drop(start).take(item).value(),
// 		page : page
// 	});
product.find().then(function(product) {
    res.render('products/index', {
        products: product
    });
});
}
module.exports.create = function(req, res) {
res.render('./products/createProduct');
}

module.exports.postCreate = function(req, res) {
// var obj = {
// 	tensp : req.body.tensp,
// 	gia : req.body.gia
// }
// db.get('products').push(req.body).write();
req.body.anhsp = req.file.path.split('/').slice(1).join('/');
req.body.gia = parseInt(req.body.gia);
var data = new product(req.body);
data.save();
res.redirect('/products');
}

module.exports.edit = function(req, res){
	// req.body.anhsp = req.file.path.split('/').slice(1).join('/');
	if(req.file === undefined){
			product.updateOne({_id : req.params.id },
			{tensp : req.body.tensp,
			gia : req.body.gia,
			tomtatsp : req.body.tomtatsp}, function(err, data){
				console.log('them thanh cong');
				res.redirect('/products');
			});
		
	}else{
		var anhsp = req.body.anhsp = req.file.path.split('/').slice(1).join('/');
		product.updateOne({_id : req.params.id },
			{tensp : req.body.tensp,
			gia : req.body.gia,
			tomtatsp : req.body.tomtatsp,
			anhsp : anhsp}, function(err, data){
				console.log('them thanh cong');
				res.redirect('/products');
			});
		
	}
}
module.exports.search = async function(req, res){
	var search = req.body.data;
	var pds = await product.find();
	
	// var pd = pds.map(function(item){
	// 		return item.tensp;
	// });
	console.log(search);
	
		var pd1 = pds.filter(function(pd){
		return pd.tensp.toLowerCase().indexOf(search.toLowerCase()) !=-1;
	});
	res.render('./products/resultsearch', {products : pd1});

}

