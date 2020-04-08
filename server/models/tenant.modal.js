"use strict";

const sql = require("../config/db");
// constructor
const Tenant = function (tenant) {
  this.propertyID = tenant.propertyID;
  this.unitID = tenant.unitID;
  this.tenantName = tenant.tenantName;
  this.genderID = tenant.genderID;
  this.age = tenant.age;
  this.dateOfBirth =
    typeof tenant.dateOfBirth !== "undefined"
      ? tenant.dateOfBirth.slice(0, 10)
      : tenant.dateOfBirth;
  this.occupationID = tenant.occupationID;
  this.religionID = tenant.religionID;
  this.contactNumber = tenant.contactNumber;
  this.email = tenant.email;
  this.proofType = tenant.proofType;
  this.proofNumber = tenant.proofNumber;
  this.description = tenant.description;
};

Tenant.create = (newTenant, result) => {
  sql.query("INSERT INTO tbltenant SET ?", newTenant, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    result(null, { tenantID: res.insertId, ...newTenant });
  });
};

Tenant.getAll = (result) => {
  sql.query(
    "SELECT PropertyID as 'key',propertyName, address, country, city,  state,  zip, description FROM tblProperty WHERE Deleted = 0",
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

Tenant.findById = (PropertyId, result) => {
  sql.query(
    `SELECT PropertyID as 'key',PropertyName, Address, Country, City,  State,  Zip, Description, CreationDate FROM tblProperty WHERE PropertyID = ${PropertyId}`,
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

Tenant.updateById = (id, tenant, result) => {
  sql.query(
    "UPDATE tblproperty SET PropertyName = ?, address = ? , City = ?, state = ?, zip = ?,country = ?, description = ?, UpdatedDate = CURRENT_TIMESTAMP WHERE PropertyID = ?",
    [
      tenant.propertyName,
      tenant.address,
      tenant.city,
      tenant.state,
      tenant.zip,
      tenant.country,
      tenant.description,
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

      console.log("updated tenant: ", { id: id, ...tenant });
      result(null, { id: id, ...tenant });
    }
  );
};

Tenant.remove = (id, result) => {
  sql.query(
    "Update tblProperty set Deleted = 1 ,DeletedDate = CURRENT_TIMESTAMPWHERE PropertyID = ?",
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

      result(null, res);
    }
  );
};

module.exports = Tenant;
