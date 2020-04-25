"use strict";

const sql = require("../config/db");

const Payment = function (payment) {
  this.propertyID = payment.propertyID;
  this.unitID = payment.unitID;
  this.tenantID = payment.tenantID;
  this.invoiceID = payment.invoiceID;
  this.deposit = payment.deposit;
  this.rentAmount = payment.rentAmount;
  this.overdueAmount = payment.overdueAmount;
  this.amountToBePaid = payment.amountToBePaid;
  this.amountPaid = payment.amountPaid;
  this.paymentTypeID = payment.paymentTypeID;
  this.paymentDate = payment.paymentDate;
};

Payment.create = (newPaymentDetails, result) => {
  Object.keys(newPaymentDetails).forEach((key) =>
    newPaymentDetails[key] === undefined ? delete newPaymentDetails[key] : {}
  );
  sql.query("INSERT INTO tblPayment SET ?", newPaymentDetails, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newPaymentDetails });
  });
};

Payment.getAll = (result) => {
  sql.query(
    `select
      P.paymenID as 'key',
      P.invoiceID,
      P.propertyID,
      P.tenantID,
      T.tenantName,
      P.unitID,
      U.unitName ,
      P.rentAmount ,
      P.overdueAmount,
      P.amountToBePaid,
      P.amountPaid,
      coalesce(P.AmountToBePaid,	0) - coalesce(P.AmountPaid,	0) as balance,
      P.paymentTypeID,
      PT.paymentType,
      P.paymentDate,
      b.billingDate,
      B.startingDate,
      B.endingDate,
      B.dueDate,
      BD.additionalCharge,
      BD.additionalChargeDetails,
      BD.deposit,
      BD.insurance,
      BD.rentTypeID,
      BD.leaseAmount,
      BD.leasePeriod,
      BD.maintenance,
      BD.netPayable,
      BD.rentAmount,
      BD.taxes
    from
      tblpayment P
    inner join tblProperty as TP on
      TP.PropertyID = P.PropertyID
      and TP.Deleted = 0
    inner join tbltenant as T on
      T.TenantID = P.TenantID
      and T.Deleted = 0
    inner join tblunit as U on
      U.UnitID = P.UnitID
      and U.Deleted = 0
    inner join lupaymenttype as PT on
      PT.paymentTypeID = P.PaymentTypeID
    inner join tblbilling as B on
      B.InvoiceID = p.InvoiceID
    inner join tblbillingdetails as BD on
      BD.billingID = B.billingID
    where
      P.Deleted = 0`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

module.exports = Payment;
