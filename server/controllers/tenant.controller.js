"use strict";

const Tenant = require("../models/tenant.modal");
const Billing = require("../models/billing.modal");
const Unit = require("../models/unit.modal");

const moment = require("moment");

const changeUtcToLocal = (date) => {
  if (typeof date === "undefined") return undefined;
  var dateUTC = moment.utc(new Date(date)).format();
  var localDate = moment.utc(dateUTC).local().format("YYYY-MM-DD HH:mm:ss");
  return localDate;
};

// Create and Save a new Tenant
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

  // Create a Tenant
  const tenant = new Tenant({
    propertyID: req.body.propertyID,
    unitID: req.body.unitID,
    tenantName: req.body.tenantName,
    genderID: req.body.genderID,
    age: req.body.age,
    dateOfBirth: changeUtcToLocal(req.body.dateOfBirth),
    occupationID: req.body.occupationID,
    religionID: req.body.religionID,
    contactNumber: req.body.contactNumber,
    email: req.body.email,
    proofTypeID: req.body.proofTypeID,
    proofNumber: req.body.proofNumber,
    description: req.body.description,
  });

  // Save Tenant in the database
  Tenant.create(tenant, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tenant.",
      });
    else {
      var tenantData = data;

      const billingDetails = new Billing({
        tenantID: tenantData.id,
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
        billingStartDate: changeUtcToLocal(req.body.billingStartDate),
      });

      Billing.createBillingDetails(billingDetails, (err, data) => {
        if (err) {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Tenant.",
          });
        } else {
          var billingData = data;
          const billing = new Billing({
            tenantID: billingData.tenantID,
            billingID: billingData.id,
            startingDate: changeUtcToLocal(req.body.billingStartDate),
            endingDate: moment(changeUtcToLocal(req.body.billingStartDate))
              .add(1, "months")
              .format("YYYY-MM-DD HH:mm:ss"),
            billingDate: moment(changeUtcToLocal(req.body.billingStartDate))
              .add(1, "months")
              .format("YYYY-MM-DD HH:mm:ss"),
            dueDate: moment(changeUtcToLocal(req.body.billingStartDate))
              .add({ days: 4, months: 1 })
              .format("YYYY-MM-DD HH:mm:ss"),
            status: "close",
          });

          Billing.createBilling(billing, (err, data) => {
            if (err) {
              res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while creating the Tenant.",
              });
            }
          });

          const unitOccupancy = new Unit({
            tenantID: tenantData.id,
            unitID: req.body.unitID,
            occupied: 1,
            moveInDate: changeUtcToLocal(req.body.moveInDate),
          });

          Unit.createUnitOccupancy(unitOccupancy, (err, data) => {
            if (err) {
              res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while creating the Tenant.",
              });
            } else {
              res.send({ ...tenantData, ...billingData, ...data });
            }
          });
        }
      });
    }
    //res.send(data);
  });
};

// Retrieve all Tenant from the database.
exports.findAll = (req, res) => {
  Tenant.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Tenant.",
      });
    else res.send(data);
  });
};

exports.findAllByUnit = (req, res) => {
  Tenant.getAllByUnit(req.params.unitId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tenant with id ${req.params.unitId}.`
        });
      } else {
        res.status(500).send({
          message: `Error retrieving Tenant with id ${req.params.unitId}.`
        });
      }
    } else res.send(data);
  });
};

// Find a single Tenant with a tenantId
exports.findOne = (req, res) => {
  Tenant.findById(req.params.tenantId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tenant with id ${req.params.tenantId}.`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving Tenant with id ${req.params.tenantId}.`,
        });
      }
    } else res.send(data);
  });
};

// Update a Tenant identified by the tenantId in the request
exports.update = (req, res) => {
  // Validate Request
  if (
    !req.body ||
    (Object.keys(req.body).length === 0 && req.body.constructor === Object)
  ) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  Tenant.updateById(req.params.tenantId, new Tenant(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tenant with id ${req.params.tenantId}.`,
        });
      } else {
        res.status(500).send({
          message: `Error updating Tenant with id ${req.params.tenantId}.`,
        });
      }
    } else res.send(data);
  });
};

// Delete a Tenant with the specified tenantId in the request
exports.delete = (req, res) => {
  Tenant.remove(req.params.tenantId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tenant with id ${req.params.tenantId}.`,
        });
      } else {
        res.status(500).send({
          message: `Could not delete Tenant with id ${req.params.tenantId}`,
        });
      }
    } else res.send({ message: `Tenant was deleted successfully!` });
  });
};

// // Delete all Tenant from the database.
// exports.deleteAll = (req, res) => {};
