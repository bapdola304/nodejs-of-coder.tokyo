module.exports.middlewareKiemTra = function(req, res, next){
	var errs = [];
		if(!req.body.name){
			errs.push('Ban chua nhap ten');
		}
		if(!req.body.age){
			errs.push('Ban chua nhap tuoi');
		}
		if(errs.length){
			res.render('user/create',{errs: errs, values : req.body});
			return;
		}
		next();
} 
