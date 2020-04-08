"use strict";

const sql = require("../config/db");
const Utils = () => {};

Utils.getAll = (obj, result) => {
  const name = obj.name;
  var sqlString;
  if (obj.type == "lu") {
    sqlString = `SELECT ${name}ID  as 'key', ${name} FROM lu${name} Where Deleted = 0`;
  } else if (obj.type == "ref") {
    sqlString = `SELECT ${name}ID  as 'key', ${name}Name FROM ref${name} Where Deleted = 0`;
  }

  sql.query(sqlString, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = Utils;
