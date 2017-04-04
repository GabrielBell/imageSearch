var express= require('express');
var router= express.Router();
var Search= require('../models/search');
var request= require('request');
var api_key="key="+process.env.GOOGLE_API+"&";
var cse_ID="cx="+process.env.GOOGLE_CSE_ID+"&"
var prettyjson= require('prettyjson');


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
	var googleURI= "https://www.googleapis.com/customsearch/v1?"+api_key+cse_ID+searchStr+numImages+"fields=items(title%2Clink%2Cpagemap(cse_thumbnail%2Ccse_image%2Cmetatags(og%3Aimage)))";
	//make request and use callback
	

	request(googleURI, function(err,response, body){
		if(err) console.log('ERROR: ',err);
		if(response.statusCode === 200){
			var output= [], img={};

			var json= JSON.parse(body);
			var results= Array.from(json.items);
			//console.log(results)
			results.forEach(function(el){
				img={}
				if(el.pagemap.cse_thumbnail && el.pagemap.cse_image && el.title && el.link){
					img['title']= el.title;
					img['thumbnail']= el.pagemap.cse_thumbnail[0].src;
					img['url']= el.pagemap.cse_image[0].src;
					img['context']= el.link;
					output.push(img);
				}
			});
			res.render('images', {results: output});
			
			//res.send(JSON.stringify(json.items, null, '\n'));
		}
	})
	
});

module.exports = router;
	





















