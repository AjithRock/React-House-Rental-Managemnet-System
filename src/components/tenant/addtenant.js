import React, { useEffect, useState } from "react";
import { Divider, Form, Input, Button, Select } from "antd";
import axios from "axios";

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 6 }
};

const validateMessages = {
  required: "This field is required!",
  types: {
    email: "Not a validate email!",
    number: "Not a validate number!"
  }
};

function AddUnit() {
  const [propertyObj, setPropertyObj] = useState([]);
  const [propertyDropdownLoading, SetPropertyDropdownLoading] = useState(true);
  const [unitObj, setunitObj] = useState([
    {
      key: 1,
      Name: "Bike"
    },
    {
      key: 2,
      Name: "Car"
    },
    {
      key: 3,
      Name: "Shop"
    },
    {
      key: 4,
      Name: "House"
    }
  ]);
  const [unitDropdownLoading, SetunitDropdownLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${global.url}/api/property`)
      .then(function(response) {
        setPropertyObj(response.data);
        SetPropertyDropdownLoading(false);
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
  }, []);

  const onFinish = values => {
    console.log(values);
    // axios
    //   .post(`${global.url}/api/property`, values.property)
    //   .then(function(response) {
    //     console.log(response);
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   })
    //   .finally(function() {
    //     // always executed
    //   });
  };

  return (
    <div className="main-container">
      <h1 className="header-title">Add Tenant</h1>
      <Divider className="header-title-divder" />
      <div>
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["unit", "ProperyID"]}
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
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {propertyObj.map(function(item, index) {
                return (
                  <Select.Option key={item.key} value={item.key}>
                    {item.Name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name={["unit", "type"]}
            label="Unit Name"
            rules={[{ required: true }]}
            labelAlign="left"
            colon={false}
          >
            <Select
              loading={unitDropdownLoading}
              showSearch
              allowClear
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
            name={["unit", "Area"]}
            label="Area (in Sq. ft)"
            labelAlign="left"
            colon={false}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["unit", "notes"]}
            labelAlign="left"
            colon={false}
            label="Notes"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default AddUnit;
