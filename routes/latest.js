var express= require('express');
var router= express.Router();
var Search= require('../models/search');

router.get('/', function(req,res){
	//query the database for last 10
	Search.find().sort({when: -1}).limit(10).exec(function(err,posts){
		if(err) res.send('problem fetching from db');
		
		res.render('latest', {last_ten: posts});
	})
	

})

module.exports = router;
