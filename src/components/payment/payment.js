import React, { useState, useEffect } from "react";
import {
  Table,
  Form,
  Input,
  message,
  Drawer,
  Button,
  Card,
  Select,
  Divider,
  DatePicker,
  Tooltip,
} from "antd";
import axios from "axios";
import { PlusOutlined, SyncOutlined } from "@ant-design/icons";
import moment from "moment";

export default function Payment() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [propertyObj, setPropertyObj] = useState([]);
  const [propertyDropdownLoading, setPropertyDropdownLoading] = useState(true);
  const [unitObj, setUnitObj] = useState([]);
  const [unitDropdownLoading, setUnitDropdownLoading] = useState(false);
  const [tenantObj, setTenantObj] = useState([]);
  const [tenantDropdownLoading, setTenantDropdownLoading] = useState(false);
  const [invoiceObj, setInvoiceObj] = useState([]);
  const [invoiceDropdownLoading, setInvoiceDropdownLoading] = useState(false);
  const [generateInvoiceLoading, setGenerateInvoiceLoading] = useState(false);
  const [paymentTypeObj, setPaymentTypeObj] = useState([]);
  const [paymentTypeDropdownLoading, setPaymentTypeDropdownLoading] = useState(
    false
  );

  const columns = [
    {
      title: "Unit Name",
      dataIndex: "unitName",
      key: "unitName",
      ellipsis: true,
      sorter: (a, b) => global.customSort(a.unitName, b.unitName),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Tenant Name",
      dataIndex: "tenantName",
      key: "tenantName",
      ellipsis: true,
      width: 200,
      sorter: (a, b) => global.customSort(a.tenantName, b.tenantName),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Amount To Be Paid",
      dataIndex: "amountToBePaid",
      key: "amountToBePaid",
      render: (text, record) => <span>₹{record.amountToBePaid}</span>,
    },
    {
      title: "Amount Paid",
      dataIndex: "amountPaid",
      key: "amountPaid",
      render: (text, record) => <span>₹{record.amountPaid}</span>,
    },
    {
      title: "Payment Type",
      dataIndex: "paymentType",
      key: "paymentType",
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      render: (text, record) => <span>₹{record.balance}</span>,
    },
    {
      title: "Billed Date",
      dataIndex: "billingDate",
      key: "billingDate",
      render: (text, record) => (
        <span>
          {moment(global.changeUtcToLocal(record.billingDate)).format(
            "Do MMMM YYYY"
          )}
        </span>
      ),
    },
    {
      title: "Paid Date",
      dataIndex: "paymentDate",
      key: "paymentDate",
      render: (text, record) => (
        <span>
          {moment(global.changeUtcToLocal(record.paymentDate)).format(
            "Do MMMM YYYY"
          )}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      width: 140,
      align: "center",
      render: (text, record) => (
        <span>
          <a onClick={() => handleEdit(record.key)}>View</a>
        </span>
      ),
    },
  ];

  const addPayment = () => {
    form.resetFields();
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
    form.resetFields();
  };

  const handleAdd = (values) => {
    setVisible(false);
    message.loading({ content: "Payment On Process", key: "Payment" });
    axios
      .post(`${global.url}/api/payment`, values)
      .then(function (response) {
        var addedData = response.data;
        addedData.key = response.data.id;
        delete addedData.id;
        addedData.unitName = unitObj.find(
          (item) => item.key == addedData.unitID
        ).unitName;
        addedData.tenantName = tenantObj.find(
          (item) => item.key == addedData.tenantID
        ).tenantName;
        addedData.paymentType = paymentTypeObj.find(
          (item) => item.key == addedData.paymentTypeID
        ).paymentType;
        addedData.balance =
          parseInt(addedData.amountToBePaid) - parseInt(addedData.amountPaid);
        // var billingData = invoiceObj.find(
        //   (item) => item.key == addedData.invoiceID
        // );
        // ["key", "rentAmount"].forEach((e) => delete billingData[e]);
        //, ...billingData
        setData(data.concat(addedData));
        message.success({
          content: "Paid successfully!",
          key: "Payment",
          duration: 3,
        });
      })
      .catch(function (error) {
        message.error({
          content: "Payment Failed!",
          key: "Payment",
          duration: 3,
        });
      });
  };

  const handleEdit = (id) => {
    var editData = data.filter((item) => item.key == id);
    console.log(editData);
  };

  const generateInvoice = () => {
    message.loading({ content: "Generate On Process", key: "Payment" });
    setGenerateInvoiceLoading(true);
    axios
      .get(`${global.url}/api/billingSync`)
      .then(function (response) {
        message.success({
          content: "Synced Successfully!",
          key: "Payment",
          duration: 3,
        });
        setGenerateInvoiceLoading(false);
      })
      .catch(function (error) {
        message.error({
          content: "Generate Failed!",
          key: "Payment",
          duration: 3,
        });
      });
  };

  const getPayment = () => {
    axios
      .get(`${global.url}/api/payment`)
      .then(function (response) {
        setLoading(false);
        setData(response.data);
      })
      .catch(function (error) {});
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

  const getPaymentType = () => {
    axios
      .get(`${global.url}/api/utils/lu/paymentType`)
      .then(function (response) {
        setPaymentTypeDropdownLoading(false);
        setPaymentTypeObj(response.data);
      })
      .catch(function (error) {});
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

  const getTenant = (value) => {
    setTenantDropdownLoading(true);
    axios
      .get(`${global.url}/api/tenant/${value}`)
      .then(function (response) {
        setTenantDropdownLoading(false);
        setTenantObj(response.data);
      })
      .catch(function (error) {});
  };

  const getInvoice = (value) => {
    setInvoiceDropdownLoading(true);
    axios
      .get(`${global.url}/api/billing/${value}`)
      .then(function (response) {
        setInvoiceDropdownLoading(false);
        setInvoiceObj(response.data);
      })
      .catch(function (error) {});
  };

  const setBillingDetails = (value) => {
    var invoiceData = invoiceObj.filter((item) => item.key == value);
    form.setFieldsValue({
      rentAmount: invoiceData[0].netPayable,
      amountToBePaid: invoiceData[0].netPayable,
    });
  };

  const amountToBePaidCalculation = () => {
    var formObj = form.getFieldsValue(["rentAmount", "overdueAmount"]);
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
    form.setFieldsValue({ amountToBePaid: netPay });
  };

  useEffect(() => {
    getProperty();
    getPayment();
    getPaymentType();
  }, []);

  return (
    <div>
      <div className="header-div">
        <h1 className="header-title">Billing</h1>
        <div className="fadeInUp" style={{ animationDelay: "0.6s" }}>
          <Tooltip title="Generate Invoice">
            <Button
              style={{ marginRight: 10 }}
              type="primary"
              ghost
              onClick={generateInvoice}
              disabled={generateInvoiceLoading}
            >
              <SyncOutlined spin={generateInvoiceLoading} />
            </Button>
          </Tooltip>

          <Button type="primary" ghost onClick={addPayment}>
            <PlusOutlined />
            New Payment
          </Button>
        </div>
      </div>
      <div className="fadeInUp" style={{ animationDelay: "0.3s" }}>
        <Drawer
          title="Add Payment"
          width={620}
          visible={visible}
          onClose={onClose}
          bodyStyle={{ paddingBottom: 80 }}
          maskClosable={false}
        >
          <Form
            {...global.layout}
            onFinish={handleAdd}
            form={form}
            name="payment"
            initialValues={{
              rentAmount: 0,
              overdueAmount: 0,
              amountToBePaid: 0,
              amountPaid: 0,
            }}
            validateMessages={global.validateMessages}
          >
            <Form.Item
              name="propertyID"
              label="Property Name"
              rules={[{ required: true }]}
            >
              <Select
                loading={propertyDropdownLoading}
                onChange={getUnit}
                showSearch
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
              name="unitID"
              label="Unit Name"
              rules={[{ required: true }]}
            >
              <Select
                loading={unitDropdownLoading}
                onChange={getTenant}
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {unitObj.map(function (item, index) {
                  return (
                    <Select.Option key={item.key} value={item.key}>
                      {item.unitName}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name="tenantID"
              label="Tenant Name"
              rules={[{ required: true }]}
            >
              <Select
                loading={tenantDropdownLoading}
                showSearch
                onChange={getInvoice}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {tenantObj.map(function (item, index) {
                  return (
                    <Select.Option key={item.key} value={item.key}>
                      {item.tenantName}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name="invoiceID"
              label="Invoice Month"
              rules={[{ required: true }]}
            >
              <Select
                loading={invoiceDropdownLoading}
                showSearch
                onChange={setBillingDetails}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {invoiceObj.map(function (item, index) {
                  return (
                    <Select.Option key={item.key} value={item.key}>
                      {moment(changeUtcToLocal(item.billingDate)).format(
                        "Do MMMM YYYY"
                      )}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Divider orientation="left">Payment Details</Divider>
            <Form.Item
              name="rentAmount"
              label="Rent Amount"
              rules={[
                {
                  required: true,
                  validator: global.checkNumber,
                },
              ]}
            >
              <Input
                disabled={true}
                prefix="₹"
                suffix="INR"
                onChange={amountToBePaidCalculation}
              />
            </Form.Item>
            <Form.Item
              name="overdueAmount"
              label="Overdue Amount"
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
                onChange={amountToBePaidCalculation}
              />
            </Form.Item>
            <Form.Item
              name="amountToBePaid"
              label="Amount To Be Paid"
              rules={[
                {
                  required: true,
                  validator: global.checkNumber,
                },
              ]}
            >
              <Input disabled={true} prefix="₹" suffix="INR" />
            </Form.Item>
            <Form.Item
              name="amountPaid"
              label="Amount Paid"
              rules={[
                {
                  required: true,
                  validator: global.checkNumber,
                },
              ]}
            >
              <Input prefix="₹" suffix="INR" />
            </Form.Item>
            <Form.Item
              name="paymentTypeID"
              label="Payment Type"
              rules={[{ required: true }]}
            >
              <Select
                loading={paymentTypeDropdownLoading}
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {paymentTypeObj.map(function (item, index) {
                  return (
                    <Select.Option key={item.key} value={item.key}>
                      {item.paymentType}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name="paymentDate"
              label="Payment Date"
              rules={[{ required: true }]}
            >
              <DatePicker
                placeholder=""
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
                getPopupContainer={(trigger) => trigger.parentNode}
              />
            </Form.Item>
            <Form.Item wrapperCol={{ ...global.layout.wrapperCol, offset: 10 }}>
              <Button type="primary" htmlType="submit">
                Submit
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
              responsive:true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        </Card>
      </div>
    </div>
  );
}
