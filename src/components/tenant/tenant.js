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
  Col,
  Row,
  DatePicker,
  Divider,
  Badge,
} from "antd";
import TenantDetails from "./tenantDetails";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";

export default function Tenant() {
  const [from] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [update, setUpdate] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const [propertyObj, setPropertyObj] = useState([]);
  const [propertyDropdownLoading, setPropertyDropdownLoading] = useState(true);
  const [unitObj, setUnitObj] = useState([]);
  const [unitDropdownLoading, setUnitDropdownLoading] = useState(false);
  const [genderObj, setGenderObj] = useState([]);
  const [genderDropdownLoading, setGenderDropdownLoading] = useState(false);
  const [religionObj, setReligionObj] = useState([]);
  const [religionDropdownLoading, setReligionDropdownLoading] = useState(false);
  const [occupationObj, setOccupationObj] = useState([]);
  const [occupationDropdownLoading, setOccupationDropdownLoading] = useState(
    false
  );
  const [proofObj, setProofObj] = useState([]);
  const [proofDropdownLoading, setProofDropdownLoading] = useState(false);
  const [rentObj, setRentObj] = useState([]);
  const [rentDropdownLoading, setRentDropdownLoading] = useState(false);

  const [requriedProofNumber, setRequriedProofNumber] = useState(false);
  const [requriedLeasePeriod, setRequriedLeasePeriod] = useState(false);
  const [divLeaseField, setDivLeaseField] = useState(false);
  const [divMonthField, setDivMonthField] = useState(false);

  const columns = [
    {
      title: "Property Name",
      dataIndex: "propertyName",
      key: "propertyName",
      ellipsis: true,
    },
    {
      title: "Tenant Name",
      dataIndex: "unitName",
      key: "unitName",
      ellipsis: true,
    },

    {
      title: "Tenant Type",
      dataIndex: "unitType",
      key: "unitType",
      ellipsis: true,
    },
    {
      title: "Area (in Sq.ft)",
      dataIndex: "areaInSqft",
      key: "areaInSqft",
      ellipsis: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
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
        ),
    },
  ];

  const addTenant = () => {
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
      message.loading({ content: "Updating Property", key: "Tenant" });
      axios
        .put(`${global.url}/api/Tenant/${editingKey}`, values)
        .then(function (response) {
          var editData = response.data;
          editData.key = parseInt(response.data.id);
          delete editData.id;
          editData.propertyName = propertyObj.find(
            (item) => item.key == editData.propertyID
          ).name;
          editData.unitType = unitObj.find(
            (item) => item.key == editData.unitTypeID
          ).name;
          const newData = [...data];
          const index = newData.findIndex((item) => editData.key === item.key);
          const item = newData[index];
          newData.splice(index, 1, { ...item, ...editData });
          setData(newData);
          message.success({
            content: "Tenant Updated successfully!",
            key: "Tenant",
            duration: 3,
          });
        })
        .catch(function (error) {
          message.error({
            content: "Failed to Update Property!",
            key: "Tenant",
            duration: 3,
          });
        });
    } else {
      message.loading({ content: "Adding Tenant", key: "Tenant" });
      axios
        .post(`${global.url}/api/tenant`, values)
        .then(function (response) {
          console.log("d");
          // var addedData = response.data;
          // addedData.key = response.data.id;
          // delete addedData.id;
          // addedData.propertyName = propertyObj.find(
          //   (item) => item.key == addedData.propertyID
          // ).name;
          // addedData.unitType = unitObj.find(
          //   (item) => item.key == addedData.unitTypeID
          // ).name;
          // setData(data.concat(addedData));
          // message.success({
          //   content: "Tenant Added successfully!",
          //   key: "Tenant",
          //   duration: 3,
          // });
        })
        .catch(function (error) {
          message.error({
            content: "Failed to Add Tenant!",
            key: "Tenant",
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

  const handleDelete = (id) => {
    message.loading({ content: "Deleting Tenant", key: "Tenant" });
    axios
      .delete(`${global.url}/api/unit/${id}`)
      .then(function (response) {
        setData(data.filter((item) => item.key != id));
        message.success({
          content: "Tenant deleted successfully!",
          key: "Tenant",
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

  const getUnit = (value) => {
    setUnitDropdownLoading(true);
    axios
      .get(`${global.url}/api/unit/${value}`)
      .then(function (response) {
        setUnitDropdownLoading(false);
        setUnitObj(response.data);
      })
      .catch(function (error) {});
  };

  const setRequriedProofNo = (value) => {
    if (typeof value !== "undefined") setRequriedProofNumber(true);
    else setRequriedProofNumber(false);
  };

  const showRelatedFields = (value) => {
    if (typeof value !== "undefined" && value == 1) {
      setDivMonthField(true);
      setDivLeaseField(false);
      setRequriedLeasePeriod(false);
    } else if (typeof value !== "undefined" && value == 2) {
      setDivMonthField(false);
      setDivLeaseField(true);
      setRequriedLeasePeriod(true);
    }
  };

  const getProperty = () => {
    axios
      .get(`${global.url}/api/property`)
      .then(function (response) {
        setPropertyDropdownLoading(false);
        setPropertyObj(response.data);
      })
      .catch(function (error) {});
  };

  const getGender = () => {
    axios
      .get(`${global.url}/api/utils/ref/gender`)
      .then(function (response) {
        setGenderDropdownLoading(false);
        setGenderObj(response.data);
      })
      .catch(function (error) {});
  };

  const getReligion = () => {
    axios
      .get(`${global.url}/api/utils/lu/religion`)
      .then(function (response) {
        setReligionDropdownLoading(false);
        setReligionObj(response.data);
      })
      .catch(function (error) {});
  };

  const getOccupation = () => {
    axios
      .get(`${global.url}/api/utils/ref/occupation`)
      .then(function (response) {
        setOccupationDropdownLoading(false);
        setOccupationObj(response.data);
      })
      .catch(function (error) {});
  };

  const getProof = () => {
    axios
      .get(`${global.url}/api/utils/lu/prooftype`)
      .then(function (response) {
        setProofDropdownLoading(false);
        setProofObj(response.data);
      })
      .catch(function (error) {});
  };

  const getRent = () => {
    axios
      .get(`${global.url}/api/utils/lu/renttype`)
      .then(function (response) {
        setRentDropdownLoading(false);
        setRentObj(response.data);
      })
      .catch(function (error) {});
  };

  const netPayCalculation = () => {
    var formObj = from.getFieldsValue([
      "rentAmount",
      "taxes",
      "insurance",
      "maintenance",
      "additionalCharge",
      "leaseAmount",
    ]);
    var netPay = 0;
    for (const item in formObj) {
      if (
        formObj[item] !== undefined &&
        formObj[item] !== "" &&
        !isNaN(formObj[item])
      ) {
        netPay = netPay + parseInt(formObj[item]);
      }
    }
    from.setFieldsValue({ netPayable: netPay });
  };

  useEffect(() => {
    getReligion();
    getProperty();
    getGender();
    getProof();
    getOccupation();
    getRent();
  }, []);

  let { path, url } = useRouteMatch();

  return (
    <>
      <div className="header-div">
        <h1 className="header-title">Tenant</h1>
        <Button type="primary" ghost onClick={addTenant}>
          <PlusOutlined />
          New Tenant
        </Button>
      </div>
      <div>
        <Drawer
          title={update ? "Edit Tenant" : "Add Tenant"}
          width={700}
          visible={visible}
          onClose={onClose}
          bodyStyle={{ paddingBottom: 80 }}
          maskClosable={false}
        >
          <Form
            layout="vertical"
            onFinish={handleAdd}
            form={from}
            name="tenant"
            initialValues={{
              additionalCharge: 0,
              deposit: 0,
              leaseAmount: 0,
              rentAmount: 0,
              insurance: 0,
              maintenance: 0,
              netPayable: 0,
              taxes: 0,
            }}
            validateMessages={global.validateMessages}
          >
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <Form.Item
                  name="propertyID"
                  label="Property Name"
                  rules={[{ required: true }]}
                >
                  <Select
                    loading={propertyDropdownLoading}
                    onChange={getUnit}
                    showSearch
                    allowClear
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
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
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <Form.Item
                  name="unitID"
                  label="Unit Name"
                  rules={[{ required: true }]}
                >
                  <Select
                    loading={unitDropdownLoading}
                    showSearch
                    allowClear
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {unitObj.map(function (item, index) {
                      return (
                        <Select.Option key={item.key} value={item.key}>
                          {item.unitName}{" "}
                          <span style={{ float: "right" }}>
                            {item.occupied === 1 ? (
                              <Badge status="error" text="Occupied" />
                            ) : (
                              <Badge status="success" text="Available" />
                            )}
                          </span>
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Divider orientation="left">Tenant Details</Divider>
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Form.Item
                  name="tenantName"
                  label="Name"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="genderID"
                  label="Gender"
                  rules={[{ required: true }]}
                >
                  <Select
                    loading={genderDropdownLoading}
                    showSearch
                    allowClear
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {genderObj.map(function (item, index) {
                      return (
                        <Select.Option key={item.key} value={item.key}>
                          {item.genderName}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Form.Item name="age" label="Age">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="dateOfBirth" label="Date Of Birth">
                  <DatePicker
                    placeholder=""
                    style={{ width: "100%" }}
                    format="DD/MM/YYYY"
                    getPopupContainer={(trigger) => trigger.parentNode}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Form.Item name="occupationID" label="Occupation">
                  <Select
                    loading={occupationDropdownLoading}
                    showSearch
                    allowClear
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {occupationObj.map(function (item, index) {
                      return (
                        <Select.Option key={item.key} value={item.key}>
                          {item.occupationName}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="religionID" label="Religion">
                  <Select
                    loading={religionDropdownLoading}
                    showSearch
                    allowClear
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {religionObj.map(function (item, index) {
                      return (
                        <Select.Option key={item.key} value={item.key}>
                          {item.religion}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Form.Item
                  name="contactNumber"
                  label="Contact Number"
                  rules={[
                    {
                      type: "string",
                      message: "The input is not valid number!",
                      len: 10,
                    },
                  ]}
                >
                  <Input prefix="+91" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Form.Item name="proofType" label="Proof Type">
                  <Select
                    loading={proofDropdownLoading}
                    showSearch
                    onChange={setRequriedProofNo}
                    allowClear
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {proofObj.map(function (item, index) {
                      return (
                        <Select.Option key={item.key} value={item.key}>
                          {item.prooftype}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="proofNumber"
                  label="Proof Number"
                  rules={[{ required: requriedProofNumber }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <Form.Item name="description" label="Description">
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Row>
            <Divider orientation="left">Rent Details</Divider>
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <Form.Item
                  name="rentTypeID"
                  label="Rent Type"
                  rules={[{ required: true }]}
                >
                  <Select
                    loading={rentDropdownLoading}
                    onChange={showRelatedFields}
                    showSearch
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {rentObj.map(function (item, index) {
                      return (
                        <Select.Option key={item.key} value={item.key}>
                          {item.renttype}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <div style={{ display: divLeaseField ? "block" : "none" }}>
              <Row gutter={[8, 8]}>
                <Col span={24}>
                  <Form.Item
                    name="leasePeriod"
                    label="Lease Period"
                    rules={[{ required: requriedLeasePeriod }]}
                  >
                    <Select
                      showSearch
                      allowClear
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {[1, 2, 3, 4, 5].map(function (item, index) {
                        return (
                          <Select.Option key={item} value={item}>
                            {item + " Years"}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={24}>
                  <Form.Item
                    name="leaseAmount"
                    label="Lease Amount"
                    rules={[{ required: true }]}
                  >
                    <Input
                      prefix="₹"
                      suffix="INR"
                      onChange={netPayCalculation}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <div style={{ display: divMonthField ? "block" : "none" }}>
              <Row gutter={[8, 8]}>
                <Col span={24}>
                  <Form.Item
                    name="deposit"
                    label="Deposit"
                    rules={[{ required: true }]}
                  >
                    <Input prefix="₹" suffix="INR" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={24}>
                  <Form.Item
                    name="rentAmount"
                    label="Rent Amount"
                    rules={[{ required: true }]}
                  >
                    <Input
                      prefix="₹"
                      suffix="INR"
                      onChange={netPayCalculation}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={24}>
                  <Form.Item
                    name="taxes"
                    label="Taxes"
                    rules={[
                      {
                        required: true,
                        validator: global.checkNumber,
                      },
                    ]}
                  >
                    <Input
                      prefix="₹"
                      suffix="INR"
                      onChange={netPayCalculation}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={24}>
                  <Form.Item
                    name="insurance"
                    label="Insurance"
                    rules={[
                      {
                        required: true,
                        validator: global.checkNumber,
                      },
                    ]}
                  >
                    <Input
                      prefix="₹"
                      suffix="INR"
                      onChange={netPayCalculation}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={24}>
                  <Form.Item
                    name="maintenance"
                    label="Maintenance"
                    rules={[
                      {
                        required: true,
                        validator: global.checkNumber,
                      },
                    ]}
                  >
                    <Input
                      prefix="₹"
                      suffix="INR"
                      onChange={netPayCalculation}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={24}>
                  <Form.Item
                    name="additionalCharge"
                    label="Additional Charge"
                    rules={[
                      {
                        required: true,
                        validator: global.checkNumber,
                      },
                    ]}
                  >
                    <Input
                      prefix="₹"
                      suffix="INR"
                      onChange={netPayCalculation}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={24}>
                  <Form.Item
                    name="additionalChargeDetails"
                    label="Additional Charge Details"
                  >
                    <Input.TextArea />
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <div
              style={{
                display: divMonthField || divLeaseField ? "block" : "none",
              }}
            >
              <Row gutter={[8, 8]}>
                <Col span={24}>
                  <Form.Item
                    name="netPayable"
                    label="Net Payable"
                    rules={[
                      {
                        required: true,
                        validator: global.checkNumber,
                      },
                    ]}
                  >
                    <Input disabled={true} prefix="₹" suffix="INR" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item
                    name="billingStartDate"
                    label="Billing Start Date"
                    rules={[{ required: true }]}
                  >
                    <DatePicker
                      placeholder=""
                      style={{ width: "100%" }}
                      format="DD/MM/YYYY"
                      getPopupContainer={(trigger) => trigger.parentNode}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="moveInDate"
                    label="Move-In Date"
                    rules={[{ required: true }]}
                  >
                    <DatePicker
                      placeholder=""
                      style={{ width: "100%" }}
                      format="DD/MM/YYYY"
                      getPopupContainer={(trigger) => trigger.parentNode}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>

            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  wrapperCol={{ ...global.layout.wrapperCol, offset: 10 }}
                >
                  <Button type="primary" htmlType="submit">
                    {update ? "Update" : "Submit"}
                  </Button>
                  <Button style={{ marginLeft: 8 }} onClick={onClose}>
                    Cancel
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
        <ul>
          <li>
            <Link to={`${url}/1`}>Rendering with React</Link>
          </li>
          <li>
            <Link to={`${url}/2`}>Components</Link>
          </li>
          <li>
            <Link to={`${url}/3`}>Props v. State</Link>
          </li>
        </ul>

        <Switch>
          <Route exact path={path}>
            <Card
              title="Tenant List"
              style={{ width: "100%" }}
              headStyle={{ padding: " 0 16px" }}
              bodyStyle={{ padding: 0 }}
            >
              <Table
                columns={columns}
                bordered={true}
                dataSource={data}
                loading={loading}
                pagination={{
                  total: data.length,
                  showTotal: (total, range) =>
                    `${range[0]}-${range[1]} of ${total} items`,
                }}
              />
            </Card>
          </Route>
          <Route path={`${path}/:topicId`}>
            <TenantDetails />
          </Route>
        </Switch>
      </div>
    </>
  );
}
