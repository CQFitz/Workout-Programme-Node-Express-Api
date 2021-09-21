module.exports = app => {
    const exercises = require("../controllers/exercise.controller.js");

    app.post("/exercises", exercises.create);
    app.get("/exercises/", exercises.findAll);
    app.get("/exercises/:exerciseShortName", exercises.findOne);
    app.put("/exercises/:exerciseShortName", exercises.update);
    app.delete("/exercises/:exerciseShortName", exercises.delete);
    app.delete("/exercises", exercises.deleteAll);
};