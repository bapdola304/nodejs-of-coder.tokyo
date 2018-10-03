 var mongoose = require('mongoose');
 var userChema = new mongoose.Schema({
 	tensp : String,
 	anhsp : String,
 	tomtatsp : String
 });

 var User = mongoose.model('user', userChema,'users');