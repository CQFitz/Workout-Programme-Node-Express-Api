module.exports = app => {
    const workout_diary = require("../controllers/workout_diary.controller.js");

    // create one diary
    app.post("/planned-workouts/:workout_diaryId/workout-diary", workout_diary.create);
    // get all collection of diary
    app.get("/planned-workouts/workout-diary/", workout_diary.findAll);
    // get one collection of diary
    app.get("/planned-workouts/:workout_diaryId/workout-diary/", workout_diary.findCollection);
    // get one collection of diary for that day
    app.get("/planned-workouts/workout-diary/:diary_date/", workout_diary.findThatDayCollection);
    // get one diary
    app.get("/planned-workouts/:workout_diaryId/workout-diary/:diary_date", workout_diary.findOne);
    // update one diary
    app.put("/planned-workouts/:workout_diaryId/workout-diary/:diary_date", workout_diary.update);
    // delete one collection of diary
    app.delete("/planned-workouts/:workout_diaryId/workout-diary/", workout_diary.deleteCollection);
    // delete one collection of diary for that day
    app.delete("/planned-workouts/workout-diary/:diary_date/", workout_diary.deleteThatDayCollection);
    // delete one diary
    app.delete("/planned-workouts/:workout_diaryId/workout-diary/:diary_date", workout_diary.deleteDiary);
    // delete all collection diary
    app.delete("/planned-workouts/workout-diary", workout_diary.deleteAll);
};