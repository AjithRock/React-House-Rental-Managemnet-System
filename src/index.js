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

global.validateMessages = {
  required: "This field is required!"
};

ReactDOM.render(<App />, document.getElementById("root"));
