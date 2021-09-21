const Exercise = require("../models/exercise.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const exercise = new Exercise({
        exercise_short_name: req.body.exercise_short_name,
        exercise_name: req.body.exercise_name,
        exercise_description: req.body.exercise_description,
    });

    Exercise.create(exercise, (err, data) => {
        if (err) {
            if (err.status === "duplicate") {
                res.status(500).send({
                    message: `DUPLICATE ERROR: exercise short name ${exercise.exercise_short_name}.`
                });
            }
            else {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the exercises."
                });
            }
        }
        
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Exercise.getAll((err, data) => {
        if (err)res.status(500).send({
            message: err.meesage || "Some error occurred while retrieving exercises."
        });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Exercise.findByTxt(req.params.exerciseShortName, (err, data) => {
        if (err) {
            if (err.status === "not_found") {
                res.status(404).send({
                    message: `Not found Exercise with short name ${req.params.exerciseShortName}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving Exercise with short name " + req.params.exerciseShortName
                });
            }
        }
        else res.send(data);
    });
}

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Exercise.updateByTxt(
        req.params.exerciseShortName,
        new Exercise(req.body),
        (err, data) => {
            if (err) {
                if (err.status === "not_found") {
                    res.status(404).send({
                        message: `UPDATE FAILED: Not found Exercise with short name ${req.params.exerciseShortName}`
                    });
                }
                else {
                    res.status(500).send({
                        message: "Error updating Exercise with short name " + req.params.exerciseShortName
                    });
                }
            }
            else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Exercise.remove(req.params.exerciseShortName, (err, data) => {
        if (err) {
            if (err.status === "not_found") {
                    res.status(404).send({
                    message: `DELETE FAILED: Not found Exercise with short name ${req.params.exerciseShortName}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Could not delete Exercise with short name " + req.params.exerciseShortName
                });
            }
        }
        else res.send({
            message: `Exercise was deleted successfully!`
        });
    })
};

exports.deleteAll = (req, res) => {
    Exercise.removeAll((err, data) => {
        if (err)res.status(500).send({
            message: err.message || "Some error occurred while removing all exercises."
        });
        else res.send(
            { message: `All exercises were deleted successfully!`
        });
    });
};
