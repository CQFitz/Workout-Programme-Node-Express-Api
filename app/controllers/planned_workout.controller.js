const PlannedWorkout = require("../models/planned_workout.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const planned_workout = new PlannedWorkout({
        exercise_short_name: req.body.exercise_short_name,
        phase_id: req.body.phase_id,
        planned_set_number: req.body.planned_set_number,
        planned_reps: req.body.planned_reps,
        planned_weight: req.body.planned_weight,
    });

    PlannedWorkout.create(planned_workout, (err, data) => {
        if (err) {
            if(err.status === 'empty_field'){
                res.status(500).send({
                    message: `EMPTY FIELD: Please fill the field with right information`
                });
            }
            else if (err.status === 'no_reference'){
                res.status(500).send({
                    message: `Empty or Not Found Reference`
                });
            }
            else if (err.status === 'int_pls'){
                res.status(500).send({
                    message: `Phase id need to be Integer`
                });
            }
            else {
                res.status(500).send({
                    message: err.message || 'Some error occurred while creating the planned workouts.'
                });
            }
        }
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    PlannedWorkout.getAll((err, data) => {
        if (err)res.status(500).send({
            message: err.message || "Some error occured while retrieving planned workouts."
        });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    PlannedWorkout.findById(req.params.planned_workoutId, (err, data) => {
        if (err) {
            if (err.status === 'not_found') {
                res.status(404).send({
                    message: `Not Found planned workout with id: ${req.params.planned_workoutId}`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving planned workout with id: " + req.params.planned_workoutId
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

    PlannedWorkout.updateById(
        req.params.planned_workoutId,
        new PlannedWorkout(req.body),
        (err, data) => {
            if (err) {
                if (err.status === "not_found") {
                    res.status(404).send({
                        message: `Not Found Planned Workout with id ${req.params.planned_workoutId}`
                    });
                }
                else if(err.status === 'empty_field'){
                    res.status(500).send({
                        message: `EMPTY FIELD: Please fill the field with right information`
                    });
                }
                else if (err.status === "no_reference"){
                    res.status(500).send({
                        message: `Empty or No Reference Found`
                    });
                }
                else if (err.status === 'int_pls'){
                    res.status(500).send({
                        message: `Phase id need to be Integer`
                    });
                }
                else {
                    res.status(500).send({
                        message: `Error updating planned workout with id ${req.params.planned_workoutId}`
                    });
                }
            }
            else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    PlannedWorkout.remove(req.params.planned_workoutId, (err, data) => {
        if (err) {
            if (err.status === 'not_found') {
                res.status(404).send({
                    message: `Not Found Planned Workout with id: ${req.params.planned_workoutId}.`
                });
            }
            else {
                res.status(500).send({
                    message: `Could Not Delete Planned Workout with id: ${req.params.planned_workoutId}`
                });
            }
        }
        else res.send({
            message: `Planned Workout was deleted successfully`
        });
    });
};

exports.deleteAll = (req, res) => {
    PlannedWorkout((err, data) => {
        if (err)res.status(500).send ({
            message: err.message || "Some error occurred while removing all Planned Workout."
        });
        else res.send({
            message: `All Planned Workout deleted successfully`
        });
    });
};
