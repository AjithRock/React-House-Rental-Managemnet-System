"use strict";

const Payment = require("../models/payment.modal");
const Helper = require("../helper");

// Create and Save a new Payment
exports.create = (req, res) => {
  // Validate request
  if (
    !req.body ||
    (Object.keys(req.body).length === 0 && req.body.constructor === Object)
  ) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a Payment details
  const invoice = new Payment({
    propertyID: req.body.propertyID,
    unitID: req.body.unitID,
    tenantID: req.body.tenantID,
    invoiceID: req.body.invoiceID,
    deposit: req.body.deposit,
    rentAmount: req.body.rentAmount,
    overdueAmount: req.body.overdueAmount,
    amountToBePaid: req.body.amountToBePaid,
    amountPaid: req.body.amountPaid,
    paymentTypeID: req.body.paymentTypeID,
    paymentDate: Helper.changeUtcToLocal(req.body.paymentDate),
  });

  //Save Payment in the database
  Payment.create(invoice, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Payment.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Payment.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Property.",
      });
    else res.send(data);
  });
};
