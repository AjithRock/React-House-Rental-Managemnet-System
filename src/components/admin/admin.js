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
      <div className="invoice-header">
        <div className="invoice-title">
          invoice
        </div>
        <div className="Company-logo">
          <span>
            test
          </span>
        </div>
      </div>
      <div>
        conternt
      </div>
      <div className="invoice-footer">
        foots
      </div>

    </>
  );
}
