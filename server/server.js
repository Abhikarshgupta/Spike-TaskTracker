var express = require("express");
var cors = require("cors");
var route = require("./Routes/index.js");
var dbConnection = require("./database.js");

var app = express();

dbConnection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/todos", route);

var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
	return console.log("server started on port " + PORT);
});
//# sourceMappingURL=server.js.map
