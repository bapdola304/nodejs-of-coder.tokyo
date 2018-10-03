var shortid = require('short-id');
var db = require('../db.js');
module.exports = function(req, res, next){
	if(!req.cookies.sessionId){
		var ssid =shortid.generate();
		res.cookie('sessionId', ssid);

		
	db.get('session').push({
		id : ssid
	}).write();
	}
	next();
}