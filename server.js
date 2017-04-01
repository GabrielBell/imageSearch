var express = require('express');
var latest= require('./routes/latest');
var imageSearch= require('./routes/imageSearch');
var mongoose= require('mongoose');
var uri= 'mongodb://localhost:27017/image_db';
var port = process.env.PORT || 8080;



//mongoose.connect(uri); use for working locally
mongoose.connect(process.env.MONGOLAB_URI); //use for deployment
var db= mongoose.connection;
db.on('open', function(){ console.log('connected to mongo')})
db.on('error', function(err){ console.log("unable to connect"); })

var app= express();

app.set('views', './views');
app.set('view engine', 'pug');

app.use('/api/imagesearch', imageSearch);
app.use('/api/latest', latest);

app.get('/', function(req,res){
	res.render('index', {title: 'Image Search Microservice', message:'Welcome to Image Search Microservice'})
})


app.listen(port, function(){
	console.log('listening on port'+port);
	
})