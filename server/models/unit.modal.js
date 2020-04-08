"use strict";

const sql = require("../config/db");
// constructor
const Unit = function (unit) {
  this.propertyID = unit.propertyID;
  this.unitName = unit.unitName;
  this.unitTypeID = unit.unitTypeID;
  this.areaInSqft = unit.areaInSqft;
  this.description = unit.description;
  this.unitID = unit.unitID;
  this.tenantID = unit.tenantID;
  this.occupied = unit.occupied;
  this.moveInDate =
    typeof unit.moveInDate !== "undefined"
      ? unit.moveInDate.slice(0, 10)
      : unit.moveInDate;
};

Unit.create = (newUnit, result) => {
  Object.keys(newUnit).forEach((key) =>
    newUnit[key] === undefined ? delete newUnit[key] : {}
  );
  sql.query("INSERT INTO tblUnit SET ?", newUnit, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newUnit });
  });
};

Unit.createUnitOccupancy = (unitOccupancy, result) => {
  Object.keys(unitOccupancy).forEach((key) =>
    unitOccupancy[key] === undefined ? delete unitOccupancy[key] : {}
  );
  sql.query("INSERT INTO tblUnitOccupancy SET ?", unitOccupancy, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { occLineID: res.insertId, ...unitOccupancy });
  });
};

Unit.getAll = (result) => {
  sql.query(
    `select
      U.UnitID as 'key',
      U.unitName,
      U.unitTypeID,
      UT.UnitType as 'unitType',
      U.propertyID,
      P.propertyName ,
      U.areaInSqft,
      U.description,
      IFNULL(UO.occupied,0) as 'occupied'
    from
      tblunit as U
    inner join luUnittype as UT on
      UT.UnitTypeID = U.UnitTypeID
    inner join tblproperty as P on
      P.propertyID = U.propertyID
    left join tblunitoccupancy as UO on
      UO.UnitID = U.UnitID
    where
      U.Deleted = 0`,
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      result(null, res);
    }
  );
};

Unit.getAllByProperty = (propertyID, result) => {
  sql.query(
    `select
      U.UnitID as 'key',
      U.unitName,
      U.unitTypeID,
      UT.UnitType as 'unitType',
      U.propertyID,
      P.propertyName ,
      U.areaInSqft,
      U.description,
      IFNULL(UO.occupied,0) as 'occupied'
    from
      tblunit as U
    inner join luUnittype as UT on
      UT.UnitTypeID = U.UnitTypeID
    inner join tblproperty as P on
      P.propertyID = U.propertyID
    left join tblunitoccupancy as UO on
      UO.UnitID = U.UnitID
    where
      U.Deleted = 0 and P.PropertyID =${propertyID}`,
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      result(null, res);
    }
  );
};

Unit.findById = (unitId, result) => {
  sql.query(
    `select
      U.UnitID as 'key',
      U.unitName,
      U.unitTypeID,
      UT.UnitType as 'unitType',
      U.propertyID,
      P.oropertyName ,
      U.areaInSqft,
      U.description
    from
      tblunit as U
    inner join luUnittype as UT on
      UT.UnitTypeID = U.UnitTypeID
    inner join tblproperty as P on
      P.propertyID = U.propertyID
    where
      U.Deleted = 0
      and U.UnitID = ${unitId}`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res[0]);
        return;
      }
      result({ kind: "not_found" }, null);
    }
  );
};

Unit.updateById = (id, unit, result) => {
  sql.query(
    `update
      tblUnit
    set
      propertyID = ?,
      unitName = ? ,
      unitTypeID = ?,
      areaInSqft = ?,
      description = ?,
      UpdatedDate = current_timestamp
    where
      UnitID = ?`,
    [
      unit.propertyID,
      unit.unitName,
      unit.unitTypeID,
      unit.areaInSqft,
      unit.description,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id: id, ...unit });
    }
  );
};

Unit.remove = (id, result) => {
  sql.query(
    `update
      tblUnit
    set
      Deleted = 1 ,
      DeletedDate = current_timestamp
    where
      unitID = ?`,
    id,
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, res);
    }
  );
};

module.exports = Unit;
