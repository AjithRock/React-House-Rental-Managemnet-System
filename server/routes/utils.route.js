"use strict";
module.exports = app => {
  const utils = require("../controllers/utils.controller");
  // Retrieve all unitTypes
  app.get("/api/utils/unitType", utils.getAllUnitType);

};