const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const useragent = require('express-useragent');
//const ip = require('ip');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});

const mockResponse = {
  foo: 'bar',
  bar: 'foo'
};

app.use(cors());
app.use(useragent.express());
app.use(express.json());
app.enable('trust proxy');
 

app.get('/useragent', function(req, res){
  res.send(req.ip);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


app.get('/api', (req, res) => {
  res.send(mockResponse);
});


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


app.get("/users", (req, res) => {
  con.query("SELECT * FROM tblUser", (err, rows, fields) => {
    if (!err) {
      //test();
      res.send({ rows, fields });
    } else {
      console.log(err);
    }
  });
});

var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: false,
  port: 587,
  requireTLS: true,
  auth: {
    user: "ajithrocks006@gmail.com",
    pass: "jkndxgdkqyqrdzle"
  }
});

var mailOptions = {
  from: "ajithrocks006@gmail.com",
  to: "ajithrocks005@gmail.com",
  subject: "Sending Email using Node.js",
  text: "That was easy!"
};
function test() {
  smtpTransport.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
