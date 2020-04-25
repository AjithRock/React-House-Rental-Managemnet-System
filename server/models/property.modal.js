"use strict";

const sql = require("../config/db");
// constructor
const Property = function (property) {
  this.propertyName = property.propertyName;
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

Property.getAll = (result) => {
  sql.query(
    `select
      PropertyID as 'key',
      propertyName,
      address,
      country,
      city,
      state,
      zip,
      description
    from
      tblProperty
    where
      Deleted = 0`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

Property.findById = (PropertyId, result) => {
  sql.query(
    `select
      PropertyID as 'key',
      PropertyName,
      Address,
      Country,
      City,
      State,
      Zip,
      Description,
      CreationDate
    from
      tblProperty
    where
    Deleted = 0
    PropertyID = ${PropertyId}`,
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
    `UPDATE tblproperty 
      SET PropertyName = ?,
      address = ? ,
      City = ?,
      state = ?,
      zip = ?,
      country = ?,
      description = ?,
      UpdatedDate = CURRENT_TIMESTAMP WHERE PropertyID = ?`,
    [
      property.propertyName,
      property.address,
      property.city,
      property.state,
      property.zip,
      property.country,
      property.description,
      id,
    ],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id: id, ...property });
    }
  );
};

Property.remove = (id, result) => {
  sql.query(
    `Update tblProperty 
      set Deleted = 1,
      DeletedDate = CURRENT_TIMESTAMP WHERE PropertyID = ? `,
    id,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result(err, null);
    }
  );
};

module.exports = Property;
