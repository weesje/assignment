module.exports = function (mongoose) {
	mongoose.connect('mongodb://localhost:27017/cars');

	var carsSchema = new mongoose.Schema({
		"color": String,
		"type": String,
		"door": Number,
		"engine": String
		//"extra": [String]
	});

	return mongoose.model('Cars', carsSchema);
}