"use strict";

const Utils = require("../models/utils.modal");

// Retrieve all Utils from the database.
exports.getAll = (req, res) => {
  Utils.getAll(req.params,(err, data) => {
    if (err)
      res.sendStatus(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};
