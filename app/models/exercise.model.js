const sql = require('./db.js');

const Exercise = function(exercise) {
    this.exercise_short_name = exercise.exercise_short_name;
    this.exercise_name = exercise.exercise_name;
    this.exercise_description = exercise.exercise_description;
};

Exercise.create = (newExercise, result) => {
    sql.query("INSERT INTO exercises SET ?", newExercise, (err, res) => {
        if (err) {
            if(err.code == 'ER_DUP_ENTRY' || err.errno == 1062) {
                console.log("Duplicate error: ", err.message);
                result({ status: "duplicate" }, null  );
                return
            }
            
            if (err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
        }

        console.log("Created exercise: ", { txt: res.insertTxt, ...newExercise });
        result(null, { txt: res.insertTxt, ...newExercise});
    });
};

Exercise.findByTxt = (exerciseShortName, result) => {
    sql.query(`SELECT * FROM exercises WHERE exercise_short_name = "${exerciseShortName}"`, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Found exercise: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ status: "not_found"}, null);
    });
};

Exercise.getAll = result => {
    sql.query("SELECT * FROM exercises", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("exercises: ", res);
        result(null, res);
    });
};

Exercise.updateByTxt = (txt, exercise, result) => {
    sql.query(
        "UPDATE exercises SET exercise_description = ?, exercise_name = ? WHERE exercise_short_name = ?", [exercise.exercise_description, exercise.exercise_name, txt], (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null ,err);
                return;
            }

            if (res.affectedRows == 0) {
                result({ status: "not_found" }, null);
                return;
            }

            console.log("Updated exercise: ", {exercise_short_name: txt, ...exercise });
            result(null, {exercise_short_name: txt, ...exercise });
        }
    );
};

Exercise.remove = (txt, result) => {
    sql.query("DELETE FROM exercises WHERE exercise_short_name = ?", txt, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ status: "not_found" }, null);
            return;
        }

        console.log("Deleted exercise with txt: ", txt);
        result(null, res);
    });
};

Exercise.removeAll = result => {
    sql.query("DELETE FROM exercises", (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }

        console.log(`Deleted ${res.affectedRowss} exercises`);
        result(null, res);
    });
};

module.exports = Exercise;