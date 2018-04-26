var mongoose = require('mongoose');
var {
	Schema
} = mongoose;

var empSchema = new Schema({
	empName: "string",
	job: "string",
	sal: "string"
})

mongoose.model("emp", empSchema, "emp")