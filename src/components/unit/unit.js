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
  Select,
  Tag,
} from "antd";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import { Trash, Edit3 } from "react-feather";

export default function Unit() {
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
      key: "propertyName",
      ellipsis: true,
      width: 200,
      sorter: (a, b) => global.customSort(a.propertyName, b.propertyName),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Unit Type",
      dataIndex: "unitType",
      key: "unitType",
      width: 200,
      ellipsis: true,
      sorter: (a, b) => global.customSort(a.unitType, b.unitType),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Unit Name",
      dataIndex: "unitName",
      key: "unitName",
      width: 200,
      ellipsis: true,
      sorter: (a, b) => global.customSort(a.unitName, b.unitName),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Area (in Sq.ft)",
      dataIndex: "areaInSqft",
      key: "areaInSqft",
      ellipsis: true,
      width: 130,
      sorter: (a, b) => global.customSort(a.areaInSqft, b.areaInSqft),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      sorter: (a, b) => global.customSort(a.description, b.description),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Status",
      dataIndex: "occupied",
      key: "occupied",
      width: 140,
      align: "center",
      render: (occupied) =>
        occupied == 1 ? (
          <span>
            <Tag style={{ width: "70px", textAlign: "center" }} color="#67bf4e">
              Occupied
            </Tag>
          </span>
        ) : (
          <span>
            <Tag style={{ width: "70px", textAlign: "center" }} color="#f7b924">
              Vacant
            </Tag>
          </span>
        ),
    },
    {
      title: "Action",
      dataIndex: "Action",
      width: 140,
      align: "center",
      render: (text, record) => (
        <span>
          <a onClick={() => handleEdit(record.key)}>
            <Edit3 color="#595959" size={18} />
          </a>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>
              <Trash size={18} color="#595959" style={{ marginLeft: 4 }} />
            </a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  const addUnit = () => {
    from.resetFields();
    setUpdate(false);
    setVisible(true);
    setEditingKey("");
  };

  const onClose = () => {
    setVisible(false);
    from.resetFields();
  };

  const handleAdd = (values) => {
    setVisible(false);
    if (update) {
      message.loading({ content: "Updating Property", key: "Unit" });
      axios
        .put(`${global.url}/api/Unit/${editingKey}`, values)
        .then(function (response) {
          var editData = response.data;
          editData.key = parseInt(response.data.id);
          delete editData.id;
          editData.propertyName = propertyObj.find(
            (item) => item.key == editData.propertyID
          ).propertyName;
          editData.unitType = unitObj.find(
            (item) => item.key == editData.unitTypeID
          ).unitType;
          console.log(data);
          console.log(editData);
          const newData = [...data];
          const index = newData.findIndex((item) => editData.key === item.key);
          const item = newData[index];
          newData.splice(index, 1, { ...item, ...editData });
          setData(newData);
          message.success({
            content: "Unit Updated successfully!",
            key: "Unit",
            duration: 3,
          });
        })
        .catch(function (error) {
          message.error({
            content: "Failed to Update Property!",
            key: "Property",
            duration: 3,
          });
        });
    } else {
      message.loading({ content: "Adding Unit", key: "Unit" });
      axios
        .post(`${global.url}/api/unit`, values)
        .then(function (response) {
          var addedData = response.data;
          addedData.key = response.data.id;
          delete addedData.id;
          addedData.propertyName = propertyObj.find(
            (item) => item.key == addedData.propertyID
          ).propertyName;
          addedData.unitType = unitObj.find(
            (item) => item.key == addedData.unitTypeID
          ).unitType;
          setData(data.concat(addedData));
          message.success({
            content: "Unit Added successfully!",
            key: "Unit",
            duration: 3,
          });
        })
        .catch(function (error) {
          message.error({
            content: "Failed to Add Unit!",
            key: "Unit",
            duration: 3,
          });
        });
    }
  };

  const handleEdit = (id) => {
    var editData = data.filter((item) => item.key == id);
    setEditingKey(editData[0].key);
    setVisible(true);
    setUpdate(true);
    from.setFieldsValue(editData[0]);
  };

  const handleMoveOut = (id) => {
    var editData = data.filter((item) => item.key == id);
    console.log(editData);
  };

  const handleDelete = (id) => {
    message.loading({ content: "Deleting Unit", key: "Unit" });
    axios
      .delete(`${global.url}/api/unit/${id}`)
      .then(function (response) {
        setData(data.filter((item) => item.key != id));
        message.success({
          content: "Unit deleted successfully!",
          key: "Unit",
          duration: 3,
        });
      })
      .catch(function (error) {
        message.error({
          content: "Failed to Delete Property!",
          key: "Property",
          duration: 3,
        });
      });
  };

  const getUnitList = () => {
    axios
      .get(`${global.url}/api/unit`)
      .then(function (response) {
        setLoading(false);
        setData(response.data);
      })
      .catch(function (error) {
        message.error({
          content: "Failed to Load Unit List!",
          key: "Unit",
          duration: 3,
        });
      });
  };

  const getUnitType = () => {
    axios
      .get(`${global.url}/api/utils/lu/unitType`)
      .then(function (response) {
        SetunitDropdownLoading(false);
        setunitObj(response.data);
      })
      .catch(function (error) {});
  };

  const getProperty = () => {
    axios
      .get(`${global.url}/api/property`)
      .then(function (response) {
        SetPropertyDropdownLoading(false);
        setPropertyObj(response.data);
      })
      .catch(function (error) {});
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
        <div className="fadeInUp" style={{ animationDelay: "0.6s" }}>
          <Button type="primary" ghost onClick={addUnit}>
            <PlusOutlined />
            New Unit
          </Button>
        </div>
      </div>
      <div className="fadeInUp" style={{ animationDelay: "0.3s" }}>
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
            onFinish={handleAdd}
            form={from}
            name="unit"
            validateMessages={global.validateMessages}
          >
            <Form.Item
              name="propertyID"
              label="Property Name"
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
                {propertyObj.map(function (item, index) {
                  return (
                    <Select.Option key={item.key} value={item.key}>
                      {item.propertyName}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name="unitName"
              label="Unit Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="unitTypeID"
              label="Unit Type"
              rules={[{ required: true }]}
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
                {unitObj.map(function (item, index) {
                  return (
                    <Select.Option key={item.key} value={item.key}>
                      {item.unitType}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item name="areaInSqft" label="Area (in Sq. ft)">
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description">
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
          style={{ width: "100%" }}
          headStyle={{ padding: " 0 16px" }}
          bodyStyle={{ padding: 0 }}
        >
          <Table
            scroll={{ x: true }}
            columns={columns}
            bordered={true}
            dataSource={data}
            loading={loading}
            pagination={{
              total: data.length,
              showSizeChanger: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        </Card>
      </div>
    </div>
  );
}
