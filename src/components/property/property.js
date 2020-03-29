import React, { useState, useEffect } from "react";
import {
  Table,
  Popconfirm,
  Form,
  Input,
  message,
  Drawer,
  Button,
  Card
} from "antd";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";

function Property() {
  const [from] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [update, setUpdate] = useState(false);
  const [editingKey, setEditingKey] = useState("");

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address"
    },

    {
      title: "City",
      dataIndex: "city",
      key: "city"
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state"
    },
    {
      title: "Zip",
      dataIndex: "zip",
      key: "zip"
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country"
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description"
    },
    {
      title: "Action",
      dataIndex: "Action",
      render: (text, record) =>
        data.length >= 1 ? (
          <span>
            <a onClick={() => handleEdit(record.key)}>Edit</a>
            {"  |  "}
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.key)}
            >
              <a>Delete</a>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <a onClick={() => handleEdit(record.key)}>Edit</a>
          </span>
        )
    }
  ];

  const AddProperty = () => {
    setUpdate(false);
    setVisible(true);
    setEditingKey("");
  };

  const onClose = () => {
    setVisible(false);
    from.resetFields();
  };

  const handleAdd = values => {
    setVisible(false);
    if (update) {
      message.loading({ content: "Updating Property", key: "Property" });
      axios
        .put(`${global.url}/api/property/${editingKey}`, values)
        .then(function(response) {
          var editData = response.data;
          editData.key = parseInt(response.data.id);
          delete editData.id;
          const newData = [...data];
          const index = newData.findIndex(item => editData.key === item.key);
          const item = newData[index];
          newData.splice(index, 1, { ...item, ...editData });
          setData(newData);
          message.success({
            content: "Property Updated successfully!",
            key: "Property",
            duration: 3
          });
        })
        .catch(function(error) {
          message.error({
            content: "Failed to Update Property!",
            key: "Property",
            duration: 3
          });
        });
    } else {
      message.loading({ content: "Adding Property", key: "Property" });
      axios
        .post(`${global.url}/api/property`, values)
        .then(function(response) {
          var addedData = response.data;
          addedData.key = response.data.id;
          delete addedData.id;
          setData(data.concat(addedData));
          message.success({
            content: "Property Added successfully!",
            key: "Property",
            duration: 3
          });
        })
        .catch(function(error) {
          message.error({
            content: "Failed to Add Property!",
            key: "Property",
            duration: 3
          });
        });
    }
  };

  const handleEdit = id => {
    var editData = data.filter(item => item.key == id);
    setEditingKey(editData[0].key);
    setVisible(true);
    setUpdate(true);
    from.setFieldsValue(editData[0]);
  };

  const handleDelete = id => {
    message.loading({ content: "Deleting Property", key: "Property" });
    axios
      .delete(`${global.url}/api/property/${id}`)
      .then(function(response) {
        setData(data.filter(item => item.key != id));
        message.success({
          content: "Property deleted successfully!",
          key: "Property",
          duration: 3
        });
      })
      .catch(function(error) {
        message.error({
          content: "Failed to Delete Property!",
          key: "Property",
          duration: 3
        });
      });
  };

  const getPropertyList = () => {
    axios
      .get(`${global.url}/api/property`)
      .then(function(response) {
        setLoading(false);
        setData(response.data);
      })
      .catch(function(error) {
        message.error({
          content: "Failed to Load Property List!",
          key: "Property",
          duration: 3
        });
      });
  };

  useEffect(() => {
    getPropertyList();
  }, []);

  return (
    <div>
      <div className="header-div">
        <h1 className="header-title">Property </h1>
        <Button type="primary" ghost onClick={AddProperty}>
          <PlusOutlined />
          New Property
        </Button>
      </div>
      <div>
        <Drawer
          title={update ? "Edit Property" : "Add Property"}
          width={540}
          visible={visible}
          onClose={onClose}
          bodyStyle={{ paddingBottom: 80 }}
          maskClosable={false}
        >
          <Form
            {...global.layout}
            name="nest-messages"
            onFinish={handleAdd}
            form={from}
            name="property"
            validateMessages={global.validateMessages}
          >
            <Form.Item
              name="name"
              label="Name"
              colon={false}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true }]}
              colon={false}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="city"
              label="City"
              rules={[{ required: true }]}
              colon={false}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="state"
              label="State"
              rules={[{ required: true }]}
              colon={false}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="zip"
              label="Zip"
              rules={[{ required: true }]}
              colon={false}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="country"
              label="Country"
              rules={[{ required: true }]}
              colon={false}
            >
              <Input />
            </Form.Item>
            <Form.Item name="description" colon={false} label="Description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item wrapperCol={{ ...global.layout.wrapperCol, offset: 10 }}>
              <Button type="primary" htmlType="submit">
                {update ? "Update" : "Submit"}
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={onClose}>
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
        <Card
          title="Property List"
          style={{ width: "100%" }}
          headStyle={{ padding: " 0 16px" }}
          bodyStyle={{ padding: 0 }}
        >
          <Table
            columns={columns}
            bordered={true}
            dataSource={data}
            loading={loading}
          />
        </Card>
      </div>
    </div>
  );
}

export default Property;
