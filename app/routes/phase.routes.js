module.exports = app => {
    const phases = require("../controllers/phase.controller.js");

    app.post("/phases", phases.create);
    app.get("/phases/", phases.findAll);
    app.get("/phases/:phaseId", phases.findOne);
    app.put("/phases/:phaseId", phases.update);
    app.delete("/phases/:phaseId", phases.delete);
    app.delete("/phases", phases.deleteAll);
};