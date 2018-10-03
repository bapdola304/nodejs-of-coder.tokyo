var db = require('../db.js');
module.exports.middlewareCookie = function(req, res,next){
	if(!req.cookies.user){
		res.redirect('login');
		return;
	}
	var user = db.get('users').find({ name:req.cookies.user }).value();

	if(!user){
		res.render('user/login',{errs : ["user does not exits."]});
		return;
	}
	res.locals.user = user;
	
	next();
}