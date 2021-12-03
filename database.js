const mongoose = require("mongoose");
const db = require("./config/keys.js").mongoURI;

module.exports = async () => {
	try {
		const connectionParams = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		};
		await mongoose.connect(db, connectionParams);
		console.log("Connected to database.");
	} catch (error) {
		console.log("Could not connect to database.", error);
	}
};
