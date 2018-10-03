var db = require('../db.js');
module.exports.login = function(req,res){
	res.render('user/login');
}

module.exports.postlogin = function(req, res){
	var name = req.body.name;
	var age = req.body.age;
	var user = db.get('users').find({ name:name }).value();

	if(!user){
		res.render('user/login',{errs : ["user does not exits."]});
		return;
	}
	if(age !== user.age){
		res.render('user/login',{errs : ["password wrong."]});
		return;
	}
	res.cookie('user', user.name);
	res.redirect('/users');
}