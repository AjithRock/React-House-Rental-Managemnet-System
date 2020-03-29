"use strict";

const sql = require("../config/db");
// constructor
const Property = function(property) {
  this.name = property.name;
  this.address = property.address;
  this.city = property.city;
  this.state = property.state;
  this.zip = property.zip;
  this.country = property.country;
  this.description = property.description;
};

Property.create = (newProperty, result) => {
  sql.query("INSERT INTO tblProperty SET ?", newProperty, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newProperty });
  });
};

Property.getAll = result => {
  sql.query(
    "SELECT ID as 'key',name, address, country, city,  state,  zip, description FROM tblProperty",
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      result(null, res);
    }
  );
};

Property.findById = (PropertyId, result) => {
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

Property.updateById = (id, property, result) => {
  sql.query(
    "UPDATE tblproperty SET name = ?, address = ? , City = ?, state = ?, zip = ?,country = ?, description = ?, UpdatedDate = CURRENT_TIMESTAMP WHERE id = ?",
    [
      property.name,
      property.address,
      property.city,
      property.state,
      property.zip,
      property.country,
      property.description,
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

      console.log("updated property: ", { id: id, ...property });
      result(null, { id: id, ...property });
    }
  );
};

Property.remove = (id, result) => {
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

module.exports = Property;
