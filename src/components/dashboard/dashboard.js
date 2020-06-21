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
  Spin,
  Empty,
} from "antd";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import { Bar, Doughnut } from "react-chartjs-2";

const CardTitleWithExtras = (title, extra) => {
  return (
    <div className="header-div" key={title}>
      <div className="dashboard-card-title"> {title} </div>
      {extra ? <div> {extra} </div> : null}
    </div>
  );
};

export default function Dashboard() {
  const [incomePropertyData, setIncomePropertyData] = useState({
    datasets: [],
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  });
  const [incomePropertyDataLoading, setincomePropertyDataLoading] = useState(
    true
  );
  const [availabilityProperty, setAvailabilityProperty] = useState({
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ["rgba(103, 191, 78, 0.5)", "rgba(247, 185, 36, 0.5)"],
        hoverBackgroundColor: [
          "rgba(103, 191, 78, 0.7)",
          "rgba(247, 185, 36, 0.7)",
        ],
        borderWidth: 1,
        borderColor: ["#67bf4e", "#f7b924"],
      },
    ],

    labels: ["Occupied", "Vacant"],
  });

  const [
    availabilityPropertyLoading,
    setavailabilityPropertyLoading,
  ] = useState(true);
  const [property, setProperty] = useState([]);
  const [dropdownDate, setDropdownDate] = useState(moment());
  const [propertyDropdownLoading, setPropertyDropdownLoading] = useState(true);

  const [rentUnpaidDue, setRentUnpaidDue] = useState([]);
  const [rentUnpaidDueLoading, setRentUnpaidDueLoading] = useState(true);
  const [rentPaidDue, setRentPaidDue] = useState([]);
  const [rentPaidDueLoading, setRentPaidDueLoading] = useState(true);

  const [propertyID, setPropertyID] = useState([1]);

  const getPropertyIncomeByYear = (dataString) => {
    if (dataString !== undefined) {
      setDropdownDate(dataString);
    } else {
      dataString = dropdownDate;
    }
    var year = moment(dataString).format("YYYY");
    setincomePropertyDataLoading(true);
    axios
      .get(`${global.url}/api/dashboard/propertyIncome/${year}/${propertyID}`)
      .then(function (response) {
        var responseData = response.data;
        var dataArr = [];
        responseData.forEach((element) => {
          var dataObj = {};
          dataObj.label = element.name;
          dataObj.data = element.data;
          dataObj.backgroundColor = "rgba(255, 99, 132, 0.5)";
          dataObj.borderColor = "rgb(255, 99, 132)";
          dataObj.borderWidth = 1;
          dataObj.maxBarThickness = 30;
          dataArr.push(dataObj);
        });

        setIncomePropertyData({
          datasets: dataArr,
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        });
        setincomePropertyDataLoading(false);
      })
      .catch(function (error) {});
  };

  const getAvailabilityProperty = () => {
    setavailabilityPropertyLoading(true);
    axios
      .get(`${global.url}/api/dashboard/propertyAvailability/${propertyID}`)
      .then(function (response) {
        var responseData = response.data;
        var dataArr = [responseData[0].occupied ,responseData[0].vacant];
        setAvailabilityProperty({
          datasets: [
            {
              data: dataArr,
              backgroundColor: [
                "rgba(103, 191, 78, 0.5)",
                "rgba(247, 185, 36, 0.5)",
              ],
              hoverBackgroundColor: [
                "rgba(103, 191, 78, 0.7)",
                "rgba(247, 185, 36, 0.7)",
              ],
              borderWidth: 1,
              borderColor: ["#67bf4e", "#f7b924"],
            },
          ],

          labels: ["Occupied", "Vacant"],
        });
        setavailabilityPropertyLoading(false);
      })
      .catch(function (error) {});
  };

  const renderNoDataJSX = () => {
    return (
      <tr>
        <td colSpan="12">
          <div className="dashboard-empty-container" style={{ height: 240 }}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </div>
        </td>
      </tr>
    );
  };

  const getPropertyRentUnpaidDue = () => {
    setRentUnpaidDueLoading(true);
    axios
      .get(`${global.url}/api/dashboard/propertyRentUnpaidDue/${propertyID}`)
      .then(function (response) {
        setRentUnpaidDueLoading(false);
        setRentUnpaidDue(response.data);
      })
      .catch(function (error) {});
  };

  const getPropertyRentPaidDue = () => {
    setRentPaidDueLoading(true);
    axios
      .get(`${global.url}/api/dashboard/propertyRentPaidDue/${propertyID}`)
      .then(function (response) {
        setRentPaidDueLoading(false);
        setRentPaidDue(response.data);
      })
      .catch(function (error) {});
  };

  const getPropertyList = () => {
    axios
      .get(`${global.url}/api/property`)
      .then(function (response) {
        setPropertyDropdownLoading(false);
        setProperty(response.data);
      })
      .catch(function (error) {});
  };

  useEffect(() => {
    getPropertyList();
  }, []);

  useEffect(() => {
    console.log("done chaning");
    getPropertyRentUnpaidDue();
    getPropertyRentPaidDue();
    getAvailabilityProperty();
    getPropertyIncomeByYear();
    return () => {
      console.log("cleanup");
    };
  }, [propertyID]);

  return (
    <>
      <div className="header-div">
        <h1 className="header-title"> Dashboard </h1>
        <div>
          <Select
            loading={propertyDropdownLoading}
            placeholder="Select a Property"
            style={{ width: 160 }}
            onChange={(value) => setPropertyID(value)}
          >
            {property.map(function (item, index) {
              return (
                <Select.Option key={item.key} value={item.key}>
                  {item.propertyName}
                </Select.Option>
              );
            })}
          </Select>
        </div>
      </div>
      <Row gutter={[24, 24]}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={6}
          className="fadeInUp"
          style={{ animationDelay: "0.3s" }}
        >
          <Card className="dashboard-Card"> tt </Card>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={6}
          className="fadeInUp"
          style={{ animationDelay: "0.4s" }}
        >
          <Card className="dashboard-Card"> tt </Card>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={6}
          className="fadeInUp"
          style={{ animationDelay: "0.5s" }}
        >
          <Card className="dashboard-Card"> tt </Card>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={6}
          className="fadeInUp"
          style={{ animationDelay: "0.6s" }}
        >
          <Card className="dashboard-Card"> tt </Card>
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={18}
          className="fadeInUp"
          style={{ animationDelay: "0.8s" }}
        >
          <Card
            title={CardTitleWithExtras(
              "Income Trend - Property",
              <DatePicker
                picker="year"
                allowClear={false}
                onChange={getPropertyIncomeByYear}
                style={{ width: 80 }}
                placeholder="Year"
                bordered={false}
                size="small"
                defaultValue={moment(
                  (() => {
                    var d = new Date();
                    return d;
                  })(),
                  "YYYY-MM-DD"
                )}
              />
            )}
            className="dashboard-Card"
            headStyle={{ paddingRight: 8 }}
          >
            <Spin spinning={incomePropertyDataLoading}>
              <Bar
                data={incomePropertyData}
                width={100}
                height={350}
                options={{
                  maintainAspectRatio: false,
                  legend: {
                    display: true,
                    fontColor: "#686868",
                    fontFamily: "kanit, sans-serif",
                  },
                  tooltips: {
                    titleAlign: "center",
                    titleMarginBottom: 8,
                    bodyFontFamily: "'Nunito', sans-serif",
                    callbacks: {
                      label: function (tooltipItem, data) {
                        var label =
                          data.datasets[tooltipItem.datasetIndex].label || "";
                        if (label) {
                          label += " : ";
                        }
                        label += "₹ " + tooltipItem.yLabel;
                        return label;
                      },
                    },
                  },
                  responsive: true,
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          fontFamily: "'Nunito', sans-serif",
                          fontSize: 14,
                        },
                      },
                    ],
                    yAxes: [
                      {
                        ticks: {
                          fontFamily: "'Nunito', sans-serif",
                          fontSize: 14,
                          beginAtZero: true,
                          callback: function (value, index, values) {
                            return "₹ " + value;
                          },
                        },
                      },
                    ],
                  },
                }}
              />
            </Spin>
          </Card>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={6}
          className="fadeInUp"
          style={{ animationDelay: "1s" }}
        >
          <Card
            title={CardTitleWithExtras("Availability - Property")}
            className="dashboard-Card"
            headStyle={{ paddingRight: 8 }}
          >
            <Spin spinning={availabilityPropertyLoading}>
              <Doughnut
                data={availabilityProperty}
                width={100}
                height={350}
                options={{
                  maintainAspectRatio: false,
                  legend: {
                    rtl: true,
                    labels: {
                      fontColor: "#686868",
                    },
                  },
                  tooltips: {
                    titleAlign: "center",
                    titleMarginBottom: 8,
                    bodyFontFamily: "'Nunito', sans-serif",
                  },
                  responsive: true,
                }}
              />
            </Spin>
          </Card>
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={12}
          className="fadeInUp"
          style={{ animationDelay: "1.2s" }}
        >
          <Card
            title={(() => {
              var m = moment().format("MMMM");
              return CardTitleWithExtras(`Rent Unpaid Dues - ${m}`);
            })()}
            loading={rentUnpaidDueLoading}
            className="dashboard-Card"
            headStyle={{ paddingRight: 8 }}
            bodyStyle={{
              paddingTop: 0,
              overflow: "auto",
              maxHeight: 340,
              height: 340,
            }}
          >
            <div className="table-responsive">
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th> # </th> <th> Tenant </th> <th> Unit </th>
                    <th> Bill Period </th> <th> Bill Date </th>
                    <th> Due Date </th>
                  </tr>
                </thead>
                <tbody>
                  {rentUnpaidDue.length > 0 ? (
                    <>
                      {rentUnpaidDue.map(function (item, index) {
                        var index = index + 1;
                        return (
                          <tr key={index}>
                            <td> {index} </td> <td> {item.tenantName} </td>
                            <td> {item.unitName} </td>
                            <td>
                              {moment(
                                global.changeUtcToLocal(item.startingDate)
                              ).format("Do MMMM")}
                              {" - "}
                              {moment(
                                global.changeUtcToLocal(item.endingDate)
                              ).format("Do MMMM")}
                            </td>
                            <td>
                              {moment(
                                global.changeUtcToLocal(item.billingDate)
                              ).format("Do MMMM")}
                            </td>
                            <td>
                              {moment(
                                global.changeUtcToLocal(item.dueDate)
                              ).format("Do MMMM")}
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  ) : (
                    renderNoDataJSX()
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={12}
          className="fadeInUp"
          style={{ animationDelay: "1.6s" }}
        >
          <Card
            loading={rentPaidDueLoading}
            title={(() => {
              var m = moment().format("MMMM");
              return CardTitleWithExtras(`Rent Paid Dues  - ${m}`);
            })()}
            className="dashboard-Card"
            headStyle={{ paddingRight: 8 }}
            bodyStyle={{
              paddingTop: 0,
              overflow: "auto",
              maxHeight: 340,
              height: 340,
            }}
          >
            <div className="table-responsive">
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th> # </th> <th> Tenant </th> <th> Unit </th>
                    <th> Bill Date </th> <th> Paid Date </th> <th> Balance </th>
                  </tr>
                </thead>
                <tbody>
                  {rentPaidDue.length > 0 ? (
                    <>
                      {rentPaidDue.map(function (item, index) {
                        var index = index + 1;
                        return (
                          <tr key={index}>
                            <td> {index} </td> <td> {item.tenantName} </td>
                            <td> {item.unitName} </td>
                            <td>
                              {moment(
                                global.changeUtcToLocal(item.billingDate)
                              ).format("Do MMMM")}
                            </td>
                            <td>
                              {moment(
                                global.changeUtcToLocal(item.paymentDate)
                              ).format("Do MMMM")}
                            </td>
                            <td> ₹{item.balance} </td>
                          </tr>
                        );
                      })}
                    </>
                  ) : (
                    renderNoDataJSX()
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}
