"use strict";
module.exports = app => {
  const unit = require("../controllers/unit.controller");
  // Create a new unit
  app.post("/api/unit", unit.create);

  // Retrieve all propertys
  app.get("/api/unit", unit.findAll);

  // Retrieve a single unit with unitId
  app.get("/api/unit/:propertyId", unit.findAllByProperty);

  // Update a unit with unitId
  app.put("/api/unit/:unitId", unit.update);

  //update unit ocupacny MoveoutStatus
  // app.patch("/api/unit/:tenantID", unit.unitMoveOut);

  // Delete a unit with unitId
  app.delete("/api/unit/:unitId", unit.delete);
};
