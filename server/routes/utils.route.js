"use strict";
module.exports = app => {
  const utils = require("../controllers/utils.controller");
  // Retrieve for luTable types
  app.get('/api/utils/:type/:name', utils.getAll);

};