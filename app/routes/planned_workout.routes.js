module.exports = app => {
    const planned_workouts = require("../controllers/planned_workout.controller.js");

    app.post("/planned-workouts", planned_workouts.create);
    app.get("/planned-workouts/", planned_workouts.findAll);
    app.get("/planned-workouts/:planned_workoutId", planned_workouts.findOne);
    app.put("/planned-workouts/:planned_workoutId", planned_workouts.update);
    app.delete("/planned-workouts/:planned_workoutId", planned_workouts.delete);
    app.delete("/planned-workouts", planned_workouts.deleteAll);
};