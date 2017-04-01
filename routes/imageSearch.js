var express= require('express');
var router= express.Router();
var Search= require('../models/search');
var request= require('request');
var api_key="key="+process.env.GOOGLE_API+"&";
var cse_ID="cx="+process.env.GOOGLE_CSE_ID+"&"

router.use(function timeLog(req,res,next){
	console.log('Time', Date.now());
	next();
})


router.get('/*', function(req,res){
	//make sure query is a rational number
	var query= req.query.offset;
	if(!/^\d{1,2}$/.test(query)){ query="10"}
	//verify/sanitize input of req.url
	var terms= /\/([\w]+[\s\w]*)\??/g.exec(decodeURIComponent(req.url))[1].split(' ');
	
	//perform check before db update
	var s = new Search({'when': Date.now(), 'terms':terms});
	s.save(function(err,doc,num){
		if(err) throw err;
		if(num) console.log('added doc to db')
	})
	//call API with  [terms,offset]
	
	var searchStr= "q="+terms.join('+')+"&";
	var numImages="num="+query+"&";
	var googleURI= "https://www.googleapis.com/customsearch/v1?"+api_key+cse_ID+searchStr+numImages+"fields=items";
	//console.log(googleURI)
	request(googleURI, function(err,response, body){
		if(err) console.log('ERROR: ',err);
		if(response.statusCode === 200){
			console.log('hurray');
			console.log(body)
		}
	})
	res.send('imagesearch get endpoint');
});

module.exports = router;






















