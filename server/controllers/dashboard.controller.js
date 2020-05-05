"use strict";

const Dashboard = require("../models/dashboard.modal");
const Helper = require("../helper");

exports.findPropertyIncome = (req, res) => {
  Dashboard.getPropertyIncome(req.params.year,req.params.propertyID, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data.",
      });
    else res.send(data);
  });
};

exports.findPropertyAvailability = (req, res) => {
  Dashboard.getPropertyAvailability(req.params.propertyID, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data.",
      });
    else res.send(data);
  });
};

exports.findPropertyRentUnpaidDue = (req, res) => {
  Dashboard.getPropertyRentUnpaidDue(req.params.propertyID, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data.",
      });
    else res.send(data);
  });
};

exports.findPropertyRentPaidDue = (req, res) => {
  Dashboard.getPropertyRentPaidDue(req.params.propertyID, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data.",
      });
    else res.send(data);
  });
};
