var express= require('express');
var router= express.Router();
var Search= require('../models/search');

router.use(function timeLog(req,res,next){
	console.log('Time', Date.now());
	next();
})


router.get('/*', function(req,res){
	var query= req.query.offset;
	
	//verify/sanitize input of req.url
	var terms= /\/([\w]+[\s\w]*)\??/g.exec(decodeURIComponent(req.url))[1].split(' ');
	console.log(terms)
	//perform check before db update
	var s = new Search({'when': Date.now(), 'terms':terms});
	s.save(function(err,doc,num){
		if(err) throw err;
		if(num) console.log('added ', doc, 'to db')
	})
	//call API with  [terms,offset]
	//https://github.com/vadimdemedes/google-images
	res.send('imagesearch get endpoint');
});

module.exports = router;






















