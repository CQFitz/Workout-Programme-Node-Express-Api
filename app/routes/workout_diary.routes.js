module.exports = app => {
    const workout_diary = require("../controllers/workout_diary.controller.js");

    app.post("/workout-diary/", workout_diary.create);
    app.get("/workout-diary/", workout_diary.findAll);
    app.get("/workout-diary/:workout_diaryId", workout_diary.findOne);
    app.put("/workout-diary/:workout_diaryId", workout_diary.update);
    app.delete("/workout-diary/:workout_diaryId/", workout_diary.delete);
    app.delete("/workout-diary/workout-diary", workout_diary.deleteAll);
};