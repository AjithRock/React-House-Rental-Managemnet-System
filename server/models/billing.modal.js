"use strict";

const sql = require("../config/db");

const Billing = function (billing) {
  this.tenantID = billing.tenantID;
  this.rentTypeID = billing.rentTypeID;
  this.leasePeriod = billing.leasePeriod;
  this.leaseAmount = billing.leaseAmount;
  this.deposit = billing.deposit;
  this.rentAmount = billing.rentAmount;
  this.taxes = billing.taxes;
  this.insurance = billing.insurance;
  this.maintenance = billing.maintenance;
  this.additionalCharge = billing.additionalCharge;
  this.additionalChargeDetails = billing.additionalChargeDetails;
  this.netPayable = billing.netPayable;
  this.billingStartDate =
    typeof billing.billingStartDate !== "undefined"
      ? billing.billingStartDate.slice(0, 10)
      : billing.billingStartDate;
};

Billing.create = (newTenant, result) => {
  sql.query("INSERT INTO tblbillingDetails SET ?", newTenant, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    result(null, { billingID: res.insertId, ...newTenant });
  });
};

module.exports = Billing;
