module.exports = app => {
    const planned_workouts = require("../controllers/planned_workout.controller.js");

    app.post("/planned_workouts", planned_workouts.create);
    app.get("/planned_workouts/", planned_workouts.findAll);
    app.get("/planned_workouts/:planned_workoutId", planned_workouts.findOne);
    app.put("/planned_workouts/:planned_workoutId", planned_workouts.update);
    app.delete("/planned_workouts/:planned_workoutId", planned_workouts.delete);
    app.delete("/planned_workouts", planned_workouts.deleteAll);
};