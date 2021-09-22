const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to cqfitz application." });
});
require("./app/routes/programme.routes.js")(app);
require("./app/routes/phase.routes.js")(app);
require("./app/routes/exercise.routes.js")(app);
require("./app/routes/planned_workout.routes.js")(app);

app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});