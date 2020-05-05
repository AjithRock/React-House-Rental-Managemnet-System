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
  this.proofTypeID = tenant.proofTypeID;
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
    T.tenantID as 'key',
    T.tenantName,
    T.age,
    T.genderID,
    G.genderName,
    T.occupationID,
    O.occupationName,
    T.religionID,
    R.religion,
    T.dateOfBirth,
    T.contactNumber,
    T.proofTypeID,
    T.proofNumber,
    T.email,
    T.description,
    T.activeIND,
    T.unitID,
    T.propertyID,
    T.creationDate
  from
    tbltenant T
  inner join refgender as G on
    G.GenderID = T.	GenderID and G.Deleted=0
  left join refoccupation as O on 
    O.OccupationID =T.OccupationID and O.Deleted=0
  left join lureligion  as R on 
    R.ReligionID = T.ReligionID and R.Deleted = 0
  where
    T.Deleted = 0 order by T.activeIND asc`,
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
      proofTypeID,
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

Tenant.findById = (tenantID, result) => {
  sql.query(
    `select
      T.tenantID as 'key',
      T.tenantName,
      T.age,
      T.genderID,
      G.genderName,
      T.occupationID,
      O.occupationName,
      T.religionID,
      R.religion,
      T.dateOfBirth,
      T.contactNumber,
      T.proofTypeID,
      PT.proofType,
      T.proofNumber,
      T.email,
      T.description,
      T.activeIND,
      T.unitID,
      UT.unitType,
      U.unitName,
      T.propertyID,
      P.propertyName,
      UO.occupied,
      UO.moveInDate,
      UO.moveOutDate,
      Uo.moveOutConditionNote,
      Uo.moveOutReasonNote,
      Uo.inspectionComplete,
      UO.depositReturnedIND,
      UO.depositReturnedDate,
      UO.depositReturnedAmount,
      UO.keysReturned,
      Uo.carParkedIND,
      Uo.gave30DayNoticeIND
    from
      tbltenant T
    inner join refgender as G on
      G.GenderID = T. GenderID
      and G.Deleted = 0
    inner join tblunitoccupancy as UO on
      UO.TenantID = T.TenantID
      and Uo.Deleted = 0
    inner join tblunit as U on
      U.UnitID = T.UnitID
      and U.Deleted = 0
    inner join tblproperty as P on
      P.PropertyID = T.PropertyID
      and P.Deleted = 0
    left join refoccupation as O on
      O.OccupationID = T.OccupationID
      and O.Deleted = 0
    left join lureligion as R on
      R.ReligionID = T.ReligionID
      and R.Deleted = 0
    inner join luUnittype as UT on
      UT.UnitTypeID = U.UnitTypeID
      and Ut.Deleted = 0
    left join luprooftype as PT on 
      PT.ProofTypeID = T.ProofTypeID
      and PT.Deleted = 0
    where
      T.Deleted = 0
      and T.TenantID = ?`,
    [tenantID],
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
