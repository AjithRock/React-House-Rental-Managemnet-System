"use strict";
module.exports = (app) => {
  const dashboard = require("../controllers/dashboard.controller");

  //get all property income by Year
  app.get('/api/dashboard/propertyIncome/:year/:propertyID', dashboard.findPropertyIncome);

  //get all available unit by property
  app.get('/api/dashboard/propertyAvailability/:propertyID', dashboard.findPropertyAvailability);

  //get all unpaid due by property
  app.get('/api/dashboard/propertyRentUnpaidDue/:propertyID', dashboard.findPropertyRentUnpaidDue);

  //get all paid due by property
  app.get('/api/dashboard/propertyRentPaidDue/:propertyID', dashboard.findPropertyRentPaidDue);
};