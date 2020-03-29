import React from "react";
import { Layout, Menu, Avatar, Button, Divider, Popover } from "antd";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "./components/dashboard/dashboard";
import Property from "./components/property/property";
import Unit from "./components/unit/unit";
import Tenant from "./components/tenant/tenant";
import Report from "./components/report/report";
import Admin from "./components/admin/admin";
import PageNotFound from "./PageNotFound";
import UserAvatar from "./assets/image/147133.png";

import {
  MenuOutlined,
  SettingOutlined,
  FileDoneOutlined,
  UserOutlined,
  ShopOutlined,
  HomeOutlined,
  DashboardOutlined
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

const LogoutDiv = data => (
  <div className="user-logoutPanel">
    <div className="user-detail">
      <Avatar size={60} src={data.avatar} />
      <div className="user-name">{data.username}</div>
      <div className="user-mail">{data.email}</div>
    </div>
    <Divider className="user-logout-divder" />
    <div style={{ textAlign: "center", marginBottom: 4 }}>
      <Button onClick={() => console.log(data)}>Logout</Button>
    </div>
  </div>
);

class App extends React.Component {
  state = {
    collapsed: false,
    userData: {
      username: "Admin User",
      email: "adminuser@admin.com",
      avatar: "src/assets/image/147133.png"
    }
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <Router>
        <Layout
          style={{
            minHeight: "100vh"
          }}
        >
          <Sider
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0
            }}
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item key="1">
                <DashboardOutlined />
                <span> Dashboard </span> <Link to="/"></Link>
              </Menu.Item>
              <Menu.Item key="2">
                <HomeOutlined />
                <span>Property</span> <Link to="/Property"></Link>
              </Menu.Item>
              <Menu.Item key="3">
                <ShopOutlined />
                <span>Unit</span> <Link to="/Unit"></Link>
              </Menu.Item>
              <Menu.Item key="4">
                <UserOutlined />
                <span>Tenant</span> <Link to="/Tenant"></Link>
              </Menu.Item>
              <Menu.Item key="5">
                <FileDoneOutlined />
                <span>Report</span> <Link to="/Report"></Link>
              </Menu.Item>
              <Menu.Item key="6">
                <SettingOutlined />
                <span>Admin</span> <Link to="/Admin"></Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header
              style={{
                background: "#fff",
                boxShadow:
                  "0 5px 15px rgba(57, 98, 254, 0.02), 0 3px 6px rgba(117, 108, 254, 0.12)",
                padding: 0,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginLeft: this.state.collapsed ? 80 : 200,
                transition: "all 0.2s",
                position: "fixed",
                height: 64,
                zIndex: 1,
                width: this.state.collapsed
                  ? "calc(100% - 80px)"
                  : "calc(100% - 200px)"
              }}
            >
              <MenuOutlined
                style={{ fontSize: 16, padding: 18 }}
                className="trigger"
                type="menu"
                onClick={this.toggle}
              />
              <div>
                <span className="user-tile">
                  {this.state.userData.username}
                </span>
                <Popover
                  overlayClassName="logout-Popover"
                  placement="bottomRight"
                  content={LogoutDiv(this.state.userData)}
                  trigger="click"
                >
                  <Avatar
                    style={{
                      float: "right",
                      margin: "16px 10px",
                      cursor: "pointer"
                    }}
                    src={UserAvatar}
                  />
                </Popover>
              </div>
            </Header>
            <Content
              className="app-container"
              style={{
                marginLeft: this.state.collapsed ? 80 : 200
              }}
            >
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/Property" component={Property} />
                <Route path="/Unit" component={Unit} />
                <Route path="/Tenant" component={Tenant} />
                <Route path="/Report" component={Report} />
                <Route path="/Admin" component={Admin} />
                <Route path="*" component={PageNotFound} />
              </Switch>
            </Content>
            <Footer
              style={{
                textAlign: "center",
                marginLeft: this.state.collapsed ? 80 : 200,
                transition: "all 0.2s"
              }}
            >
              Sweet Home {new Date().getFullYear()}
            </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
