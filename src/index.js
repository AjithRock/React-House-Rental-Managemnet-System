import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import App from "./App";

global.url = "http://localhost:3000";
global.layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

global.customSort = (a, b) => {
  if (a > b) return 1;
  if (b > a) return -1;
  return 0;
};

global.checkNumber = (rule, value) => {
  if (!isNaN(value)) {
    return Promise.resolve();
  }
  return Promise.reject('Please enter a number!');
};

global.validateMessages = {
  required: "This field is required!"
};

ReactDOM.render(<App />, document.getElementById("root"));
