"use strict";

const sql = require("../config/db");
const moment = require("moment");

const Dashboard = () => {};

Dashboard.getPropertyIncome = (year, propertyID, result) => {
  var createYear = `${year}-01-01`;
  sql.query(
    `select
      P.propertyID,
      TP.propertyName ,
      year(P.PaymentDate) as "year",
      month(P.PaymentDate) as "month",
      sum(p.AmountPaid) as 'totalAmount'
    from
      tblpayment P
    inner join tblproperty as TP on
      TP.PropertyID = P.PropertyID
    where
      p.propertyID = ? 
      and p.paymentdate between DATE(?) and DATE_SUB(DATE_ADD(?,interval 1 year), interval 1 day)
    group by
      P.PropertyID,
      year(P.PaymentDate),
      month(P.PaymentDate)
    order by
      P.PropertyID ,
      month
    `,
    [propertyID, createYear, createYear],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      } else {
        sql.query(
          `select propertyID ,propertyName from tblproperty where Deleted = 0 and propertyID = ?`,
          propertyID,
          (err, propertyRes) => {
            if (err) {
              result(null, err);
              return;
            } else {
              var propertyData = [];
              propertyRes.forEach((element) => {
                var dataArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                res.forEach((innerEle) => {
                  if (innerEle.propertyID == element.propertyID) {
                    dataArr[innerEle.month - 1] = innerEle.totalAmount;
                  }
                });
                propertyData.push({
                  id: element.propertyID,
                  name: element.propertyName,
                  year: year,
                  data: dataArr,
                });
              });
              result(null, propertyData);
            }
          }
        );
      }
    }
  );
};

Dashboard.getPropertyAvailability = (propertyID, result) => {
  sql.query(
    `select
    V.vacant,
    V2.occupied
  from
    (
    select
      count(U.UnitID) as 'Vacant'
    from
      tblunit as U
    inner join luUnittype as UT on
      UT.UnitTypeID = U.UnitTypeID
      and UT.Deleted = 0
    inner join tblproperty as P on
      P.propertyID = U.propertyID
      and P.Deleted = 0
    left join tblunitoccupancy as UO on
      UO.UnitID = U.UnitID
      and UO.Occupied != 0
    where
      U.Deleted = 0
      and P.PropertyID = ?
      and (UO.Occupied = 0
        or UO.Occupied is null)) as V,
    (
    select
      count(U.UnitID) as 'Occupied'
    from
      tblunit as U
    inner join luUnittype as UT on
      UT.UnitTypeID = U.UnitTypeID
      and UT.Deleted = 0
    inner join tblproperty as P on
      P.propertyID = U.propertyID
      and P.Deleted = 0
    left join tblunitoccupancy as UO on
      UO.UnitID = U.UnitID
      and UO.Occupied != 0
    where
      U.Deleted = 0
      and P.PropertyID = ?
      and Occupied = 1) as V2
    `,
    [propertyID, propertyID],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      result(null, res);
    }
  );
};

Dashboard.getPropertyRentUnpaidDue = (propertyID, result) => {
  var startDate = moment().startOf("month").format("YYYY-MM-DD");
  var endDate = moment().endOf("month").format("YYYY-MM-DD");
  sql.query(
    `select
      T.tenantName,
      U.unitName,
      B.startingDate,
      B.endingDate,
      B.billingDate,
      B.dueDate,
      B.closedOn
    from
      tblbilling B
    inner join tbltenant as T on
      T.TenantID = B.TenantID
      and T.Deleted = 0
    inner join tblunit as U on
      T.UnitID = U.UnitID
    left join tblpayment as P on
      P.InvoiceID = B.InvoiceID
      and P.Deleted = 0
    where
      T.PropertyID = ?
      and P.PaymenID is null
      and B.BillingDate between ? and  ?
    order by
      B.BillingDate
    `,
    [propertyID, startDate, endDate],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      result(null, res);
    }
  );
};

Dashboard.getPropertyRentPaidDue = (propertyID, result) => {
  var startDate = moment().startOf("month").format("YYYY-MM-DD");
  var endDate = moment().endOf("month").format("YYYY-MM-DD");
  sql.query(
    `select
      T.tenantName,
      U.unitName,
      B.startingDate ,
      B.endingDate ,
      B.billingDate ,
      B.dueDate,
      B.closedOn,
      P.paymenID,
      P.paymentDate,
      coalesce(P.AmountToBePaid,	0) - coalesce(P.AmountPaid,	0) as balance
    from
      tblbilling B
    inner join tbltenant as T on
      T.TenantID = B.TenantID
      and T.Deleted = 0
    inner join tblunit as U on
      T.UnitID = U.UnitID
    inner join tblpayment as P on
      P.InvoiceID = B.InvoiceID
      and P.Deleted = 0
    where
      T.PropertyID = ?
      and B.BillingDate between ? and  ?
    order by
    P.PaymentDate DESC
    `,
    [propertyID, startDate, endDate],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      result(null, res);
    }
  );
};

module.exports = Dashboard;
