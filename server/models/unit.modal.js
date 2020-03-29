"use strict";

const sql = require("../config/db");
// constructor
const Unit = function(unit) {
  this.propertyID = unit.propertyID;
  this.unitName = unit.unitName;
  this.unitTypeID = unit.unitTypeID;
  this.areaInSqft = unit.areaInSqft;
  this.description = unit.description;
};

Unit.create = (newUnit, result) => {
  console.log(newUnit);
  sql.query("INSERT INTO tblUnit SET ?", newUnit, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newUnit });
  });
};

Unit.getAll = result => {
  sql.query(
    "SELECT U.UnitID as 'key',U.unitName, U.unitTypeID, UT.name AS 'unitType', U.propertyID,P.name AS 'propertyName', U.areaInSqft, U.description FROM tblunit AS U  INNER JOIN luUnittype AS UT ON UT.ID = U.UnitTypeID  INNER JOIN tblproperty AS P ON P.ID = U.propertyID  WHERE U.Deleted = 0",
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      result(null, res);
    }
  );
};

Unit.findById = (PropertyId, result) => {
  sql.query(
    `SELECT ID as 'key',Name, Address, Country, City,  State,  Zip, Description, CreationDate FROM tblProperty WHERE id = ${PropertyId}`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res[0]);
        return;
      }
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    }
  );
};

Unit.updateById = (id, unit, result) => {
  sql.query(
    "UPDATE tblproperty SET name = ?, address = ? , City = ?, state = ?, zip = ?,country = ?, description = ?, UpdatedDate = CURRENT_TIMESTAMP WHERE id = ?",
    [
      unit.name,
      unit.address,
      unit.city,
      unit.state,
      unit.zip,
      unit.country,
      unit.description,
      id
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated unit: ", { id: id, ...unit });
      result(null, { id: id, ...unit });
    }
  );
};

Unit.remove = (id, result) => {
  sql.query("DELETE FROM tblProperty WHERE id = ?", id, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res);
  });
};

module.exports = Unit;
