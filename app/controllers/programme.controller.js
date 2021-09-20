const Programme = require("../models/programme.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const programme = new Programme({
        programme_details: req.body.programme_details
    });

    Programme.create(programme, (err, data) => {
        if (err)res.status(500).send({
            message: err.message || "Some error occurred while creating the Programmes."
        });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Programme.getAll((err, data) => {
        if (err)res.status(500).send({
            message: err.meesage || "Some error occurred while retrieving programmes."
        });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Programme.findById(req.params.programmeId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Programme with id ${req.params.programmeId}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving Programme with id " + req.params.programmeId
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

    Programme.updateById(
        req.params.programmeId,
        new Programme(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Programme with id ${req.params.programmeId}`
                    });
                }
                else {
                    res.status(500).send({
                        message: "Error updating Programme with id " + req.params.programmeId
                    });
                }
            }
            else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Programme.remove(req.params.programmeId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                    res.status(404).send({
                    message: `Not found Programme with id ${req.params.programmeId}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Could not delete Programme with id " + req.params.programmeId
                });
            }
        }
        else res.send({
            message: `Programme was deleted successfully!`
        });
    })
};

exports.deleteAll = (req, res) => {
    Programme.removeAll((err, data) => {
        if (err)res.status(500).send({
            message: err.message || "Some error occurred while removing all programmes."
        });
        else res.send(
            { message: `All Programmes were deleted successfully!`
        });
    });
};
