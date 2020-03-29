"use strict";

const sql = require("../config/db");

const Utils = () => {};

Utils.getAllUnitType = result => {
  sql.query(
    "SELECT ID as 'key',Name FROM luUnitType Where Deleted = 0",
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      result(null, res);
    }
  );
};

module.exports = Utils;
