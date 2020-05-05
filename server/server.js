const express = require("express");
const cors = require("cors");
//const useragent = require('express-useragent');
//const ip = require('ip');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
//app.use(useragent.express());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// //handel unavailable routes
// app.use((req, res, next) => {
//   res.status(503).send({
//     status: 503,
//     error: "Service Unavailable"
//   });
// });

//utils route
require("./routes/utils.route")(app);

//Property route
require("./routes/property.route")(app);

//Unit route
require("./routes/unit.route")(app);

//Tenant route
require("./routes/tenant.route")(app);

//Billing route
require("./routes/billing.route")(app);

//Payment route
require("./routes/payment.route")(app);

//Dashboard route
require("./routes/dashboard.route")(app);