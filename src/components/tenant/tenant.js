import React, { useState, useEffect } from "react";
import { Table, Divider,Popconfirm } from "antd";
import axios from "axios";

function PropertySearch() {
  const [loading,setLoading] = useState(true);
  const [data,setData] = useState([]);

  const columns = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name"
    },
    {
      title: "Address",
      dataIndex: "Address",
      key: "Address"
    },
    {
      title: "Note",
      dataIndex: "Notes",
      key: "Notes"
    },
    {
      title: "City",
      dataIndex: "City",
      key: "City"
    },
    {
      title: "State",
      dataIndex: "State",
      key: "State"
    },
    {
      title: "Zip",
      dataIndex: "Zip",
      key: "Zip"
    },
    {
      title: "Country",
      dataIndex: "Country",
      key: "Country"
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      render: (text, record) =>
        data.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    }
  ];

  const handleDelete = (id)=> {
    console.log("id", id);
  }


  useEffect(() => {
    axios
      .get(`${global.url}/api/property`)
      .then(function(response) {
        setLoading(false);
        setData(response.data);
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
  }, []);

  return (
    <div className="main-container">
      <h1 className="header-title">Tenant Search</h1>
      <Divider className="header-title-divder" />
      <div>
        <Table
          columns={columns}
          dataSource={data}
          bordered={true}
          size="small"
          loading={loading}
        />
      </div>
    </div>
  );
}

export default PropertySearch;
