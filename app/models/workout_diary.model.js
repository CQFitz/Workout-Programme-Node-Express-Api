const sql = require('./db.js');

const WorkoutDiary = function(workout_diary) {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed); 
    const ret = today.toDateString();
    this.planned_exercise_id = workout_diary.planned_exercise_id;
    this.diary_date = ret.replace(/ /g, '_'); // format eg. "d/mm/yyyy" ... "9/23/2021" diary_date will set to the day it writen
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

        console.log("Created workout diary: ", {id: res.insertId, ...newWorkoutDiary });
        result(null, {id: res.insertId, ...newWorkoutDiary});
    });
};

WorkoutDiary.findById = (workout_diaryId, result) => {
    sql.query(`SELECT * FROM workout_diary WHERE workout_diary_id = ${workout_diaryId}`, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Found Workout Diary: ", res[0]);
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

WorkoutDiary.updateById = (id, workout_diary, result) => {
    sql.query(
        "UPDATE workout_diary SET start_time = ?, end_time = ?, actual_set_number = ?, actual_reps = ?, actual_weight = ?, comments = ?, other_details = ?, WHERE workout_diary_id = ?", [workout_diary.start_time, workout_diary.end_time, workout_diary.actual_set_number, workout_diary.actual_reps, workout_diary.actual_weight, workout_diary.comments, workout_diary.other_details, id], (err, res) => {
            if (err) {
                if (err.code == "ER_NO_REFERENCED_ROW_2" || err.errno == 1452) {
                    console.log("No Planned Workout Reference: ", err);
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

WorkoutDiary.removeById = (id, result) => {
    sql.query("DELETE FROM workout_diary WHERE workout_diary_id = ?", id, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ status: "not_found" }, null);
            return;
        }

        console.log(`Deleted workout diary with id ${id}`);
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