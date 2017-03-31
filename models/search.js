var mongoose= require('mongoose');
var Schema= mongoose.Schema;

var searchSchema= new Schema({
	terms: [String],
	when: Date
});

module.exports = mongoose.model('Search', searchSchema);