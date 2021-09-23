const WorkoutDiary = require("../models/workout_diary.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const workout_diary = new WorkoutDiary({
        planned_exercise_id: req.body.planned_exercise_id,
        diary_date: req.body.diary_date,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        actual_set_number: req.body.actual_set_number,
        actual_reps: req.body.actual_reps,
        actual_weight: req.body.actual_weight,
        comments: req.body.comments,
        other_details: req.body.other_details,
    });

    WorkoutDiary.create(workout_diary, (err, data) => {
        if (err) {
            if (err.status === 'no_reference') {
                res.status(500).send({
                    message: `Empty or Not Found planned_exercise_id: ${workout_diary.planned_exercise_id}.`
                });
            }
            else {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the workout diary."
                });
            }
        }
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    WorkoutDiary.getAll((err, data) => {
        if (err)res.status(500).send({
            message: err.meesage || "Some error occurred while retrieving workout diary."
        });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    WorkoutDiary.findById(req.params.workout_diaryId, (err, data) => {
        if (err) {
            if (err.status === "not_found") {
                res.status(404).send({
                    message: `Not found workout diary with id ${req.params.workout_diaryId}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving workout diary with id " + req.params.workout_diaryId
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

    WorkoutDiary.updateById(
        req.params.workout_diaryId,
        new WorkoutDiary(req.body),
        (err, data) => {
            if (err) {
                if (err.status === "not_found") {
                    res.status(404).send({
                        message: `Not found workout diary with id ${req.params.workout_diaryId}`,
                    });
                }
                else if (err.status === "no_reference") {
                    res.status(500).send({
                        message: `Empty or Not Found planned_exercise_id: ${req.body.planned_exercise_id}`
                    })
                }
                else {
                    res.status(500).send({
                        message: "Error updating workout diary with id " + req.params.workout_diaryId
                    });
                }
            }
            else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    WorkoutDiary.removeById(req.params.workout_diaryId, (err, data) => {
        if (err) {
            if (err.status === "not_found") {
                    res.status(404).send({
                    message: `Not found workout diary with id ${req.params.workout_diaryId}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Could not delete workout diary with id " + req.params.workout_diaryId
                });
            }
        }
        else res.send({
            message: `Workout diary was deleted successfully!`
        });
    })
};

exports.deleteAll = (req, res) => {
    WorkoutDiary.removeAll((err, data) => {
        if (err)res.status(500).send({
            message: err.message || "Some error occurred while removing all workout diary."
        });
        else res.send(
            { message: `All workout diary were deleted successfully!`
        });
    });
};
