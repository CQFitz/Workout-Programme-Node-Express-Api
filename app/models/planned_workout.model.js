const sql = require('./db.js');

const PlannedWorkout = function(planned_workout) {
    this.exercise_short_name = planned_workout.exercise_short_name;
    this.phase_id = planned_workout.phase_id;
    this.planned_set_number = planned_workout.planned_set_number;
    this.planned_reps = planned_workout.planned_reps;
    this.planned_weight = planned_workout.planned_weight;
};

PlannedWorkout.create = (newPlanned, result) => {
    sql.query("INSERT INTO planned_workouts SET ?", newPlanned, (err, res) => {
        if (err) {
            if (err.code ==='ER_BAD_NULL_ERROR' || err.errno === 1048) {
                console.log("Empty");
                result({ status:"empty_field"}, null);
                return;
            }
            else if (err.code === 'ER_NO_REFERENCED_ROW_2' || err.errno === 1452) {
                console.log("Empty or Not Found Reference");
                result({ status:"no_reference"}, null );
                return;
            }
            else if (err.code === "ER_TRUNCATED_WRONG_VALUE_FOR_FIELD" || err.errno === 1366){
                console.log("Phase need to be an interger");
                result({ status:"int_pls"}, null );
                return;
            }
        }
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        console.log("Created planned_workout: ", { Id: res.insertId, ...newPlanned });
        result(null, { Id: res.insertId, ...newPlanned});
    });
};

PlannedWorkout.findById = (planned_workoutId, result) => {
    sql.query(`SELECT * FROM planned_workouts WHERE planned_exercise_id = "${planned_workoutId}"`, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Found planned_workout: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ status: "not_found"}, null);
    });
};

PlannedWorkout.getAll = result => {
    sql.query("SELECT * FROM planned_workouts", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("planned_workouts: ", res);
        result(null, res);
    });
};

PlannedWorkout.updateById = (Id, planned_workout, result) => {
    sql.query(
        "UPDATE planned_workouts SET exercise_short_name = ?, phase_id = ?, planned_set_number = ?, planned_reps = ?, planned_weight = ? WHERE planned_exercise_id = ?", [planned_workout.exercise_short_name, planned_workout.phase_id, planned_workout.planned_set_number, planned_workout.planned_reps, planned_workout.planned_weight, Id], (err, res) => {
            if (err) {
                if (err.code ==='ER_BAD_NULL_ERROR' || err.errno === 1048) {
                    console.log("Empty");
                    result({ status:"empty_field"}, null);
                    return;
                }
                else if (err.code === 'ER_NO_REFERENCED_ROW_2' || err.errno === 1452) {
                    console.log("Empty or Not Found Reference");
                    result({ status:"no_reference"}, null );
                    return;
                }
                else if (err.code === "ER_TRUNCATED_WRONG_VALUE_FOR_FIELD" || err.errno === 1366){
                    console.log("Phase need to be an interger");
                    result({ status:"int_pls"}, null );
                    return;
                }
                else {
                    console.log("Error: ", err);
                    result(null ,err);
                    return;
                }
            }

            if (res.affectedRows == 0) {
                result({ status: "not_found" }, null);
                return;
            }

            console.log("Updated planned_workout: ", {exercise_short_name: Id, ...planned_workout });
            result(null, {exercise_short_name: Id, ...planned_workout });
        }
    );
};

PlannedWorkout.remove = (Id, result) => {
    sql.query("DELETE FROM planned_workouts WHERE exercise_short_name = ?", Id, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ status: "not_found" }, null);
            return;
        }

        console.log("Deleted planned_workout with Id: ", Id);
        result(null, res);
    });
};

PlannedWorkout.removeAll = result => {
    sql.query("DELETE FROM planned_workouts", (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }

        console.log(`Deleted ${res.affectedRowss} planned_workouts`);
        result(null, res);
    });
};

module.exports = PlannedWorkout;