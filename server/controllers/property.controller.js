"use strict";

const Property = require("../models/property.modal");

// Create and Save a new Property
exports.create = (req, res) => {
  // Validate request
  if (
    !req.body ||
    (Object.keys(req.body).length === 0 && req.body.constructor === Object)
  ) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Property
  const property = new Property({
    propertyName: req.body.propertyName,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    country: req.body.country,
    description: req.body.description
  });

  // Save Property in the database
  Property.create(property, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Property."
      });
    else res.send(data);
  });
};

// Retrieve all Property from the database.
exports.findAll = (req, res) => {
  Property.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Property."
      });
    else res.send(data);
  });
};

// Find a single Property with a propertyId
exports.findOne = (req, res) => {
  Property.findById(req.params.propertyId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Property with id ${req.params.propertyId}.`
        });
      } else {
        res.status(500).send({
          message: `Error retrieving Property with id ${req.params.propertyId}.`
        });
      }
    } else res.send(data);
  });
};

// Update a Property identified by the propertyId in the request
exports.update = (req, res) => {
  // Validate Request
  if (
    !req.body ||
    (Object.keys(req.body).length === 0 && req.body.constructor === Object)
  ) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  Property.updateById(
    req.params.propertyId,
    new Property(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Property with id ${req.params.propertyId}.`
          });
        } else {
            res.status(500).send({
              message: `Error updating Property with id ${req.params.propertyId}.`
            });
          }
      } else res.send(data);
    }
  );
};

// Delete a Property with the specified propertyId in the request
exports.delete = (req, res) => {
    Property.remove(req.params.propertyId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Property with id ${req.params.propertyId}.`
          });
        } else {
          res.status(500).send({
            message: `Could not delete Property with id ${req.params.propertyId}`
          });
        }
      } else res.send({ message: `Property was deleted successfully!`});
    });
  };

// // Delete all Property from the database.
// exports.deleteAll = (req, res) => {};
