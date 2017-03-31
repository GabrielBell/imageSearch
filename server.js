var express = require('express');
var latest= require('./routes/latest');
var imageSearch= require('./routes/imageSearch');
var mongoose= require('mongoose');
var uri= 'mongodb://localhost:27017/image_db';
var port = process.env.PORT || 8080;


mongoose.connect(uri);
var db= mongoose.connection;
db.on('open', function(){ console.log('connected to mongo')})
db.on('error', function(){ console.log('unable to connect to mongo')})

var app= express();

app.use('/api/imagesearch', imageSearch);
app.use('/api/latest', latest);




app.listen(port, function(){
	console.log('listening on port'+port);
})