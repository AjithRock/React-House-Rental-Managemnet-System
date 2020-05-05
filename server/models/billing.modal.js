"use strict";

const sql = require("../config/db");
const moment = require("moment");

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
  this.billingStartDate = billing.billingStartDate;
  this.billingID = billing.billingID;
  this.startingDate = billing.startingDate;
  this.endingDate = billing.endingDate;
  this.billingDate = billing.billingDate;
  this.dueDate = billing.dueDate;
  this.status = billing.status;
};

Billing.createBillingDetails = (newBillingDetails, result) => {
  Object.keys(newBillingDetails).forEach((key) =>
    newBillingDetails[key] === undefined ? delete newBillingDetails[key] : {}
  );
  sql.query(
    "INSERT INTO tblbillingDetails SET ?",
    newBillingDetails,
    (err, res) => {
      if (err) {
        console.log(err);
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...newBillingDetails });
    }
  );
};

Billing.createBilling = (newBilling, result) => {
  Object.keys(newBilling).forEach((key) =>
    newBilling[key] === undefined ? delete newBilling[key] : {}
  );
  sql.query("INSERT INTO tblbilling SET ?", newBilling, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newBilling });
  });
};

Billing.getAllByTenant = (tenantID, result) => {
  sql.query(
    `select
      b.invoiceID as 'key',
      b.startingDate,
      b.endingDate,
      b.billingDate,
      b.dueDate,
      bd.rentAmount,
      bd.rentTypeID,
      bd.insurance,
      bd.additionalCharge,
      bd.additionalChargeDetails,
      bd.maintenance,
      bd.taxes,
      bd.netPayable,
      bd.deposit,
      bd.leaseAmount,
      bd.leasePeriod
    from
      tblbilling b
    inner join tblbillingdetails as bd on
      bd.BillingID = b.BillingID
    left join tblpayment as P on
      p.InvoiceID = b.InvoiceID
    where
      p.PaymenID is null and b.TenantID = ?`,
    tenantID,
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      result(null, res);
    }
  );
};

Billing.createBillingTillDate = (result) => {
  sql.query(
    `select
      b.tenantID,
      b.billingID,
      bd.RentTypeID,
      max(cast(b.BillingDate as date)) as lastInvoiceGeneratedDate
    from
      tblbilling as b
    inner join tblbillingdetails as bd on
      bd.BillingID = b.BillingID
    left join tbltenant as T on
      T.TenantID = B.TenantID
    where
      t.ActiveIND = 0
    group by
      TenantID`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      } else {
        var billingData = res;
        for (var i in billingData) {
          if(billingData[i].RentTypeID == 2) continue;
          var lastInvoiceDate = new Date(
            billingData[i].lastInvoiceGeneratedDate
          );
          var todayDate = new Date();
          var monthdiffrentCount = moment(moment(todayDate).endOf('month')).diff(
            moment(lastInvoiceDate),
            "months",
            true
          );

          var sqlString =
            monthdiffrentCount >= 1
              ? `INSERT INTO tblbilling (billingID, StartingDate, EndingDate, BillingDate,DueDate,Status,TenantID,ClosedOn) VALUES `
              : "";
          for (var y = 1; monthdiffrentCount >= y; y++) {
            var billEndDate = moment(lastInvoiceDate)
              .add({ months: y })
              .format("YYYY-MM-DD");
            sqlString =
              sqlString +
              `(${billingData[i].billingID},'${moment(lastInvoiceDate)
                .add({ months: parseInt(y) - 1 })
                .format(
                  "YYYY-MM-DD"
                )}','${billEndDate}','${billEndDate}','${moment(
                lastInvoiceDate
              )
                .add({ days: 4, months: y })
                .format("YYYY-MM-DD")}','close',${billingData[i].tenantID},'${billEndDate}'),`;
          }
          if (sqlString.length != 0) {
            sqlString = sqlString.slice(0, -1) + ";";
            sql.query(sqlString, (err, res) => {
              if (err) {
                result(err, null);
                return;
              }
            });
          }
        }
        result(null, {
          message: `created Billing Successfully`,
        });
      }
    }
  );
};

module.exports = Billing;
