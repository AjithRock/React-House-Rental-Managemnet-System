"use strict";
module.exports = app => {
  const property = require("../controllers/property.controller");
  // Create a new property
  app.post("/api/property", property.create);

  // Retrieve all propertys
  app.get("/api/property", property.findAll);

  // Retrieve a single property with propertyId
  app.get("/api/property/:propertyId", property.findOne);

  // Update a property with propertyId
  app.put("/api/property/:propertyId", property.update);

  // Delete a property with propertyId
  app.delete("/api/property/:propertyId", property.delete);
};
