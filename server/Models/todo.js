const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
	todo: {
		type: String,
		required: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
});

const todo = mongoose.model("todo", todoSchema);
module.exports = todo;
