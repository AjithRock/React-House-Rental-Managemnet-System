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
  Col,
  Row,
  DatePicker,
  Divider,
  Badge,
  Tag,
  PageHeader,
  Statistic,
  Descriptions,
  Skeleton,
  Tabs,
} from "antd";
import axios from "axios";
import moment from "moment";
import { useParams } from "react-router-dom";
import {
  CarTwoTone,
  ShopTwoTone,
  HomeTwoTone,
  BankTwoTone,
} from "@ant-design/icons";

export default function TenantProfile() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const { TabPane } = Tabs;

  let { topicId } = useParams();

  const getTenantDetail = () => {
    axios
      .get(`${global.url}/api/tenantProfile/${topicId}`)
      .then(function (response) {
        setLoading(false);
        setData(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        message.error({
          content: "Failed to Load Property List!",
          key: "Property",
          duration: 3,
        });
      });
  };

  useEffect(() => {
    getTenantDetail();
  }, []);
  return (
    <div className="fade-in">
      <Card
        style={{ width: "100%" }}
        headStyle={{ padding: " 0 16px" }}
        bodyStyle={{ padding: 0 }}
      >
        {!loading ? (
          <PageHeader
            onBack={() => history.back()}
            title={<span style={{ fontSize: 28 }}>{data.tenantName}</span>}
            extra={
              data.occupied == 1 ? (
                <Button key="1" type="primary" ghost danger>
                  Move Out
                </Button>
              ) : null
            }
          >
            <Row>
              <Col span={19}>
                <Descriptions size="small" column={2}>
                <Descriptions.Item label="Gender">
                    {data.genderName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Age">{data.age}</Descriptions.Item>
                 
                  <Descriptions.Item label="Date Of Birth">
                    {moment(global.changeUtcToLocal(data.dateOfBirth)).format(
                      "Do MMMM YYYY"
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Religion">
                    {data.religion}
                  </Descriptions.Item>

                  <Descriptions.Item label="Contact Number">
                    {!data.contactNumber ? null : "+91"} {data.contactNumber}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email">
                    {data.email}
                  </Descriptions.Item>
                  
                  <Descriptions.Item label="Occupation">
                    {data.occupationName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Proof Type">
                    {data.proofType}
                  </Descriptions.Item>
                  <Descriptions.Item label="Proof Number">
                    {data.proofNumber}
                  </Descriptions.Item>
                  <Descriptions.Item label="Property Name">
                    {data.propertyName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Move In Date">
                    {moment(global.changeUtcToLocal(data.moveInDate)).format(
                      "Do MMMM YYYY"
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Unit Name">
                    {data.unitName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Billing Start Date">
                    {moment(
                      global.changeUtcToLocal(data.billingStartDate)
                    ).format("Do MMMM YYYY")}
                  </Descriptions.Item>
                  <Descriptions.Item label="Notes">
                    {data.description}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
              <Col span={5}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Statistic
                    title="Status"
                    value={data.activeIND ? "Inactive" : "Active"}
                    style={{
                      marginRight: 32,
                    }}
                  />
                  <Statistic
                    title="Balance to be paid"
                    prefix="₹"
                    value={568}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <div style={{ marginRight: 84 }}>
                    <div
                      className="ant-statistic-title"
                      style={{ marginTop: 12 }}
                    >
                      Unit Type
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {(() => {
                        switch (data.unitType) {
                          case "Car":
                            return <CarTwoTone style={{ fontSize: 45 }} />;
                          case "Shop":
                            return <ShopTwoTone style={{ fontSize: 45 }} />;
                          case "House":
                            return <HomeTwoTone style={{ fontSize: 45 }} />;
                          case "Godown":
                            return <BankTwoTone style={{ fontSize: 45 }} />;
                          default:
                            return "";
                        }
                      })()}
                      <span
                        className="ant-statistic-content"
                        style={{ marginLeft: 14 }}
                      >
                        {data.unitType}
                      </span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Tabs defaultActiveKey="1" style={{ width: "100%" }} size="large">
                <TabPane tab="Payment" key="1">
                  <p>Content of Tab Pane 2</p>
                  <p>Content of Tab Pane 2</p>
                  <p>Content of Tab Pane 2</p>
                  <p>Content of Tab Pane 2</p>
                  <p>Content of Tab Pane 2</p>
                  <p>Content of Tab Pane 2</p>
                  <p>Content of Tab Pane 2</p>
                  <p>Content of Tab Pane 2</p>
                  <p>Content of Tab Pane 2</p>
                </TabPane>
                <TabPane tab="Rule" key="2">
                  <p>Content of Tab Pane 2</p>
                  <p>Content of Tab Pane 2</p>
                  <p>Content of Tab Pane 2</p>
                </TabPane>
              </Tabs>
            </Row>
          </PageHeader>
        ) : (
          <div style={{ padding: 24 }}>
            <Skeleton active={true} avatar paragraph={{ rows: 6 }} />
          </div>
        )}
      </Card>
    </div>
  );
}
