module.exports = app => {
    const programmes = require("../controllers/programme.controller.js");

    app.post("/programmes", programmes.create);
    app.get("/programmes/", programmes.findAll);
    app.get("/programmes/:programmeId", programmes.findOne);
    app.put("/programmes/:programmeId", programmes.update);
    app.delete("/programmes/:programmeId", programmes.delete);
    app.delete("/programmes", programmes.deleteAll);
};