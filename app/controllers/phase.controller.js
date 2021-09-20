const Phase = require("../models/phase.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const phase = new Phase({
        programme_id: req.body.programme_id,
        phase_title: req.body.phase_title,
    });

    Phase.create(phase, (err, data) => {
        if (err)res.status(500).send({
            message: err.message || "Some error occurred while creating the phases."
        });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Phase.getAll((err, data) => {
        if (err)res.status(500).send({
            message: err.meesage || "Some error occurred while retrieving phases."
        });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Phase.findById(req.params.phaseId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Phase with id ${req.params.phaseId}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving Phase with id " + req.params.phaseId
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

    Phase.updateById(
        req.params.phaseId,
        new Phase(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Phase with id ${req.params.phaseId}`
                    });
                }
                else {
                    res.status(500).send({
                        message: "Error updating Phase with id " + req.params.phaseId
                    });
                }
            }
            else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Phase.remove(req.params.phaseId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                    res.status(404).send({
                    message: `Not found Phase with id ${req.params.phaseId}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Could not delete Phase with id " + req.params.phaseId
                });
            }
        }
        else res.send({
            message: `Phase was deleted successfully!`
        });
    })
};

exports.deleteAll = (req, res) => {
    Phase.removeAll((err, data) => {
        if (err)res.status(500).send({
            message: err.message || "Some error occurred while removing all phases."
        });
        else res.send(
            { message: `All phases were deleted successfully!`
        });
    });
};
