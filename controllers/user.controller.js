var db = require('../db.js');

module.exports.index = function(req,res){
	res.render('user/users',{users : db.get('users').value()});
}
module.exports.search = function(req,res){
	var q = req.query.q;
	var search = db.get('users').value();
	// .filter(function(user){
	// 	return user.name.toLowerCase().indexOf(q.toLowerCase()) !=-1;
	// });
	console.log(search);
	res.render('user/users',{users : search, keywork : q});
}
module.exports.create = function(req,res){
	// console.log(user);
	res.render('user/create');
}
module.exports.postCreate = function(req, res){
		req.body.avatar = req.file.path.split('/').slice(1).join('/');
		db.get('users').push(req.body).write();

		res.redirect('/users');
}