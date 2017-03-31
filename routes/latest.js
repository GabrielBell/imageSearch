var express= require('express');
var router= express.Router();
var Search= require('../models/search');

router.get('/', function(req,res){
	res.send('GET handler for latest endpoint')
})

module.exports = router;
