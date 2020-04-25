import React from "react";
import { Breadcrumb } from "antd";

export default function Admin() {
  return (
    <>
      <div className="header-div">
        <h1 className="header-title">Admin</h1>
      </div>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
    </>
  );
}
