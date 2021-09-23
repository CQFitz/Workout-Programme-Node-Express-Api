const sql = require('./db.js');

const WorkoutDiary = function(workout_diary) {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed); 
    this.planned_exercise_id = workout_diary.planned_exercise_id;
    this.diary_date = today.toLocaleDateString(); // format eg. "d/mm/yyyy" ... "9/23/2021" diary_date will set to the day it writen
    this.start_time = workout_diary.start_time;
    this.end_time = workout_diary.end_time;
    this.actual_set_number = workout_diary.actual_set_number
    this.actual_reps = workout_diary.actual_reps;
    this.actual_weight = workout_diary.actual_weight;
    this.comments = workout_diary.comments;
    this.other_details = workout_diary.other_details;
};

WorkoutDiary.create = (newWorkoutDiary, result) => {
    sql.query("INSERT INTO workout_diary SET ?", newWorkoutDiary, (err, res) => {
        if (err) {
            if (err.code == "ER_NO_REFERENCED_ROW_2" || err.errno == 1452) {
                console.log("No Planned Workout Reference: ", err);
                result({ status:"no_reference"}, null );
                return;
            }

            if (err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
        }

        console.log("Created workout diary: ", {...newWorkoutDiary });
        result(null, {...newWorkoutDiary});
    });
};

WorkoutDiary.getCollectionById = (workout_diaryId, result) => {
    sql.query(`SELECT * FROM workout_diary WHERE planned_exercise_id = ${workout_diaryId}`, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Found collection of workout diary: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ status: "not_found"}, null);
    });
};

WorkoutDiary.getCollectionThatDay = (diary_date, result) => {
    sql.query(`SELECT * FROM workout_diary WHERE diary_date = ${diary_date}`, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Found collection of workout diary: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ status: "not_found"}, null);
    });
};

WorkoutDiary.findDiary = (workout_diaryId, diary_date, result) => {
    sql.query(`SELECT * FROM workout_diary WHERE planned_exercise_id = ${workout_diaryId} AND diary_date = ${diary_date}`, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Found collection of workout diary: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ status: "not_found"}, null);
    });
};

WorkoutDiary.getAll = result => {
    sql.query("SELECT * FROM workout_diary", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("All workout diary: ", res);
        result(null, res);
    });
};

WorkoutDiary.updateDiary = (id, diary_date, workout_diary, result) => {
    sql.query(
        "UPDATE workout_diary SET start_time = ?, end_time = ?, actual_set_number = ?, actual_reps = ?, actual_weight = ?, comments = ?, other_details = ?, WHERE planned_exercise_id = ? AND diary_date = ?", [workout_diary.start_time, workout_diary.end_time, workout_diary.actual_set_number, workout_diary.actual_reps, workout_diary.actual_weight, workout_diary.comments, workout_diary.other_details, id, diary_date], (err, res) => {
            if (err) {
                if (err.code == "ER_NO_REFERENCED_ROW_2" || err.errno == 1452) {
                    console.log("No Programme Reference: ", err);
                    result({ status:"no_reference"}, null );
                    return;
                }

                else {
                    console.log("Error: ", err),
                    result(null, err);
                    return;
                }
            }

            if (res.affectedRows == 0) {
                result({ status: "not_found" }, null);
                return;
            }

            console.log("Updated workout diary: ", {id: id, ...workout_diary });
            result(null, {id: id, ...workout_diary });
        }
    );
};

WorkoutDiary.removeCollection = (id, result) => {
    sql.query("DELETE FROM workout_diary WHERE planned_exercise_id = ?", id, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ status: "not_found" }, null);
            return;
        }

        console.log("Deleted workout_diary with id: ", id);
        result(null, res);
    });
};

WorkoutDiary.removeCollectionThatDay = (diary_date, result) => {
    sql.query("DELETE FROM workout_diary WHERE diary_date = ?", diary_date, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ status: "not_found" }, null);
            return;
        }

        console.log("Deleted Collection of workout diary with diary_date: ", id);
        result(null, res);
    });
};

WorkoutDiary.removeDiary = (id, diary_date, result) => {
    sql.query("DELETE FROM workout_diary WHERE planned_exercise_id = ? AND diary_date = ?", id, diary_date, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ status: "not_found" }, null);
            return;
        }

        console.log(`Deleted workout diary with id ${id} and diary date ${diary_date}`);
        result(null, res);
    });
};

WorkoutDiary.removeAll = result => {
    sql.query("DELETE FROM workout_diary", (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }

        console.log(`Deleted ${res.affectedRows} workout_diary`);
        result(null, res);
    });
};

module.exports = WorkoutDiary;