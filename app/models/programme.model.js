const sql = require("./db.js");

const Programme = function(programme) {
    this.programme_details = programme.programme_details;
};

Programme.create = (newProgramme, result) => {
    sql.query("INSERT INTO programmes SET ?", newProgramme, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Created programme: ", { id: res.insertId, ...newProgramme });
        result (null, { id: res.insertId, ...newProgramme});
    });
};

Programme.findById = (programmeId, result) => {
    sql.query(`SELECT * FROM programmes WHERE programme_id = ${programmeId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Found programme: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Programme.getAll = result => {
    sql.query("SELECT * FROM programmes", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("programmes: ", res);
        result(null, res);
    });
};

Programme.updateById = (id, programme, result) => {
    sql.query(
        "UPDATE programmes SET programme_details = ? WHERE programme_id = ?", [programme.programme_details, id], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("Updated programme: ", {id: id, ...programme });
            result(null, {id: id, ...programme });
        }
    );
};

Programme.remove = (id, result) => {
    sql.query("DELETE FROM programmes WHERE programme_id = ?", id, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Deleted programme with id: ", id);
        result(null, res);
    });
};

Programme.removeAll = result => {
    sql.query("DELETE FROM programmes", (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }

        console.log(`Deleted ${res.affectedRows} programmes`);
        result(null, res);
    });
};

module.exports = Programme;