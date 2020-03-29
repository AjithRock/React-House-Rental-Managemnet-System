import React, { useState, useEffect } from "react";
import {
  Table,
  Popconfirm,
  Form,
  Input,
  message,
  Drawer,
  Button,
  Card,
  Select
} from "antd";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";

function Unit() {
  const [from] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [update, setUpdate] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const [propertyObj, setPropertyObj] = useState([]);
  const [propertyDropdownLoading, SetPropertyDropdownLoading] = useState(true);
  const [unitObj, setunitObj] = useState([]);
  const [unitDropdownLoading, SetunitDropdownLoading] = useState(false);
   
  const columns = [
    {
      title: "Property Name",
      dataIndex: "propertyName",
      key: "propertyName"
    },
    {
      title: "Unit Name",
      dataIndex: "unitName",
      key: "unitName"
    },

    {
      title: "Unit Type",
      dataIndex: "unitType",
      key: "unitType"
    },
    {
      title: "Area (in Sq.ft)",
      dataIndex: "areaInSqft",
      key: "areaInSqft"
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

  const addUnit = () => {
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
      message.loading({ content: "Updating Property", key: "Unit" });
      axios
        .put(`${global.url}/api/Unit/${editingKey}`, values)
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
            content: "Unit Updated successfully!",
            key: "Unit",
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
      message.loading({ content: "Adding Unit", key: "Unit" });
      axios
        .post(`${global.url}/api/unit`, values)
        .then(function(response) {
          var addedData = response.data;
          addedData.key = response.data.id;
          delete addedData.id;
          setData(data.concat(addedData));
          message.success({
            content: "Unit Added successfully!",
            key: "Unit",
            duration: 3
          });
        })
        .catch(function(error) {
          message.error({
            content: "Failed to Add Unit!",
            key: "Unit",
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

  const getUnitList = () => {
    axios
      .get(`${global.url}/api/unit`)
      .then(function(response) {
        setLoading(false);
        console.log(response.data);
        setData(response.data);
      })
      .catch(function(error) {
        message.error({
          content: "Failed to Load Unit List!",
          key: "Unit",
          duration: 3
        });
      });
  };

  const getUnitType = () => {
    axios
      .get(`${global.url}/api/utils/unitType`)
      .then(function(response) {
        SetunitDropdownLoading(false);
        setunitObj(response.data)
      })
      .catch(function(error) {});
  };

  const getProperty = () => {
    axios
      .get(`${global.url}/api/property`)
      .then(function(response) {
        SetPropertyDropdownLoading(false);
        setPropertyObj(response.data);
      })
      .catch(function(error) {});
  };

  useEffect(() => {
    getProperty();
    getUnitList();
    getUnitType();
  }, []);

  return (
    <div>
      <div className="header-div">
        <h1 className="header-title">Unit</h1>
        <Button type="primary" ghost onClick={addUnit}>
          <PlusOutlined />
          New Unit
        </Button>
      </div>
      <div>
        <Drawer
          title={update ? "Edit Unit" : "Add Unit"}
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
            name="unit"
            validateMessages={global.validateMessages}
          >
            <Form.Item
              name="propertyID"
              label="Propery Name"
              labelAlign="left"
              colon={false}
              rules={[{ required: true }]}
            >
              <Select
                loading={propertyDropdownLoading}
                showSearch
                allowClear
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {propertyObj.map(function(item, index) {
                  return (
                    <Select.Option key={item.key} value={item.key}>
                      {item.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name="unitName"
              label="Unit Name"
              rules={[{ required: true }]}
              labelAlign="left"
              colon={false}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="unitTypeID"
              label="Unit Type"
              rules={[{ required: true }]}
              labelAlign="left"
              colon={false}
            >
              <Select
                loading={unitDropdownLoading}
                showSearch
                allowClear
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {unitObj.map(function(item, index) {
                  return (
                    <Select.Option key={item.key} value={item.key}>
                      {item.Name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name="areaInSqft"
              label="Area (in Sq. ft)"
              labelAlign="left"
              colon={false}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              labelAlign="left"
              colon={false}
              label="Description"
            >
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

export default Unit;
