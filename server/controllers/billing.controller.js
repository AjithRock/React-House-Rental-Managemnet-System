"use strict";

const Billing = require("../models/billing.modal");

// Create and Save a new Billing
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

  // Create a Billing details
  const billing = new Billing({
    tenantID: req.body.tenantID,
    rentTypeID: req.body.rentTypeID,
    leasePeriod: req.body.leasePeriod,
    leaseAmount: req.body.leaseAmount,
    deposit: req.body.deposit,
    rentAmount: req.body.rentAmount,
    taxes: req.body.taxes,
    insurance: req.body.insurance,
    maintenance: req.body.maintenance,
    additionalCharge: req.body.additionalCharge,
    additionalChargeDetails: req.body.additionalChargeDetails,
    netPayable: req.body.netPayable,
    billingStartDate: req.body.billingStartDate,
  });

  //Save Billing in the database
  Billing.create(billing, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Billing.",
      });
    else res.send(data);
  });
};

exports.findAllByTenant = (req, res) => {
  Billing.getAllByTenant(req.params.tenantId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found billing with id ${req.params.tenantId}.`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving billing with id ${req.params.tenantId}.`,
        });
      }
    } else res.send(data);
  });
};

exports.SyncBilling = (req, res) => {
  Billing.createBillingTillDate((err, data) => {
    if (err) {
      res.status(404).send({
        message: `Error In Creating Bill`,
      });
    } else res.send(data);
  });
};
