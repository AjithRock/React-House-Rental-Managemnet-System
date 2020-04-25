"use strict";

const sql = require("../config/db");
// constructor
const Tenant = function (tenant) {
  this.propertyID = tenant.propertyID;
  this.unitID = tenant.unitID;
  this.tenantName = tenant.tenantName;
  this.genderID = tenant.genderID;
  this.age = tenant.age;
  this.dateOfBirth = tenant.dateOfBirth;
  this.occupationID = tenant.occupationID;
  this.religionID = tenant.religionID;
  this.contactNumber = tenant.contactNumber;
  this.email = tenant.email;
  this.proofType = tenant.proofType;
  this.proofNumber = tenant.proofNumber;
  this.description = tenant.description;
};

Tenant.create = (newTenant, result) => {
  Object.keys(newTenant).forEach((key) =>
    newTenant[key] === undefined ? delete newTenant[key] : {}
  );
  sql.query("INSERT INTO tbltenant SET ?", newTenant, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newTenant });
  });
};

Tenant.getAll = (result) => {
  sql.query(
    `select
      tenantID as 'key',
      tenantName Age,
      GenderID,
      OccupationID,
      ReligionID,
      DateOfBirth,
      ContactNumber,
      ProofType,
      ProofNumber,
      Email,
      Description,
      ActiveIND,
      UnitID,
      PropertyID,
      CreationDate
    from
      tbltenant
    where
      Deleted = 0
    `,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

Tenant.getAllByUnit = (tenantID, result) => {
  sql.query(
    `select
      tenantID as 'key',
      tenantName, 
      Age,
      genderID,
      occupationID,
      religionID,
      dateOfBirth,
      contactNumber,
      proofType,
      proofNumber,
      email,
      description,
      activeIND,
      unitID,
      propertyID,
      creationDate
    from
      tbltenant
    where
      Deleted = 0 
      and unitID = ?
    `,
    [tenantID],
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
    AND PropertyID = ${PropertyId}`,
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
    `UPDATE tblproperty 
      SET PropertyName = ?,
      address = ?,
      City = ?, 
      state = ?, 
      zip = ?,
      country = ?,
      description = ?,
      UpdatedDate = CURRENT_TIMESTAMP WHERE PropertyID = ?`,
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
