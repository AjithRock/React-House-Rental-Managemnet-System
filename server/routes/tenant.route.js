"use strict";
module.exports = (app) => {
  const tenant = require("../controllers/tenant.controller");
  // Create a new tenant
  app.post("/api/tenant", tenant.create);

  // Retrieve all tenants
  app.get("/api/tenant", tenant.findAll);

  // Retrieve a single unit with unitId
  app.get("/api/tenant/:unitId", tenant.findAllByUnit);

  // Retrieve a single tenant with tenantId
  app.get("/api/tenantProfile/:tenantId", tenant.findOne);

  // Update a tenant with tenantId
  app.put("/api/tenant/:tenantId", tenant.update);

  // Delete a tenant with tenantId
  app.delete("/api/tenant/:tenantId", tenant.delete);
};
