"use strict";
module.exports = (app) => {
  const payment = require("../controllers/payment.controller");
  // Create a new payment
  app.post("/api/payment", payment.create);
  //get all Paid List
  app.get("/api/payment", payment.findAll);
};