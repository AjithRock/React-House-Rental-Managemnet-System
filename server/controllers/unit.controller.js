"use strict";

const Unit = require("../models/unit.modal");

// Create and Save a new Unit
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

  // Create a Unit
  const unit = new Unit({
    propertyID: req.body.propertyID,
    unitName: req.body.unitName,
    unitTypeID: req.body.unitTypeID,
    areaInSqft: req.body.areaInSqft,
    description: req.body.description
  });

  // Save Unit in the database
  Unit.create(unit, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Unit."
      });
    else res.send(data);
  });
};

// Retrieve all Unit from the database.
exports.findAll = (req, res) => {
  Unit.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

exports.findAllByProperty = (req, res) => {
  Unit.getAllByProperty(req.params.propertyId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Unit with id ${req.params.unitId}.`
        });
      } else {
        res.status(500).send({
          message: `Error retrieving Unit with id ${req.params.unitId}.`
        });
      }
    } else res.send(data);
  });
};

// Update a Unit identified by the unitId in the request
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

  Unit.updateById(
    req.params.unitId,
    new Unit(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Unit with id ${req.params.unitId}.`
          });
        } else {
            res.status(500).send({
              message: `Error updating Unit with id ${req.params.unitId}.`
            });
          }
      } else res.send(data);
    }
  );
};

// Delete a Unit with the specified unitId in the request
exports.delete = (req, res) => {
    Unit.remove(req.params.unitId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Unit with id ${req.params.unitId}.`
          });
        } else {
          res.status(500).send({
            message: `Could not delete Unit with id ${req.params.unitId}`
          });
        }
      } else res.send({ message: `Unit was deleted successfully!`});
    });
  };

// // Delete all Unit from the database.
// exports.deleteAll = (req, res) => {};
