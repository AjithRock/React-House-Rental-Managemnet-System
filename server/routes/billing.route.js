"use strict";
module.exports = (app) => {
  const billing = require("../controllers/billing.controller");
  // Create a new billing
  app.post("/api/billing", billing.create);

  // Retrieve all tenants
  app.get("/api/billingSync", billing.SyncBilling);

  // Retrieve all with tenantId
  app.get("/api/billing/:tenantId", billing.findAllByTenant);
};
