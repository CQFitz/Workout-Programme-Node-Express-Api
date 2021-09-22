const sql = require('./db.js');

const Phase = function(phase) {
    this.phase_title = phase.phase_title;
    this.programme_id = phase.programme_id;
};

Phase.create = (newPhase, result) => {
    sql.query("INSERT INTO phases SET ?", newPhase, (err, res) => {
        if (err) {
            if (err.code == "ER_NO_REFERENCED_ROW_2" || err.errno == 1452) {
                console.log("No Programme Reference: ", err);
                result({ status:"no_reference"}, null );
                return;
            }

            if (err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
        }

        console.log("Created phase: ", { id: res.insertId, ...newPhase });
        result(null, { id: res.insertId, ...newPhase});
    });
};

Phase.findById = (phaseId, result) => {
    sql.query(`SELECT * FROM phases WHERE phase_id = ${phaseId}`, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Found phase: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ status: "not_found"}, null);
    });
};

Phase.getAll = result => {
    sql.query("SELECT * FROM phases", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("phases: ", res);
        result(null, res);
    });
};

Phase.updateById = (id, phase, result) => {
    sql.query(
        "UPDATE phases SET programme_id = ?, phase_title = ? WHERE phase_id = ?", [phase.programme_id, phase.phase_title, id], (err, res) => {
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

            console.log("Updated phase: ", {id: id, ...phase });
            result(null, {id: id, ...phase });
        }
    );
};

Phase.remove = (id, result) => {
    sql.query("DELETE FROM phases WHERE phase_id = ?", id, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ status: "not_found" }, null);
            return;
        }

        console.log("Deleted phase with id: ", id);
        result(null, res);
    });
};

Phase.removeAll = result => {
    sql.query("DELETE FROM phases", (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }

        console.log(`Deleted ${res.affectedRows} phases`);
        result(null, res);
    });
};

module.exports = Phase;