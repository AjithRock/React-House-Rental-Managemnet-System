import React from "react";
import "antd/dist/antd.css";
import { Layout, Menu, Icon } from "antd";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "./components/dashboard/dashboard";
import Property from "./components/property/property";
import Tenant from "./components/tenant/tenant";
import Report from "./components/report/report";
import Admin from "./components/admin/admin";
import PageNotFound from "./PageNotFound";

const { Header, Content, Footer, Sider } = Layout;

class App extends React.Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({
      collapsed
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
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item key="1">
                <Icon type="dashboard" />
                <span> Dashboard </span> <Link to="/"></Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="home" />
                <span> Property </span> <Link to="/Property"></Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="user" />
                <span> Tenant </span> <Link to="/Tenant"></Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Icon type="file-done" />
                <span> Report </span> <Link to="/Report"></Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Icon type="setting" />
                <span> Admin </span> <Link to="/Admin"></Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header
              style={{
                background: "#fff",
                padding: 0
              }}
            />
            <Content
              style={{
                margin: "0 16px"
              }}
            >
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/Property" component={Property} />
                <Route path="/Tenant" component={Tenant} />
                <Route path="/Report" component={Report} />
                <Route path="/Admin" component={Admin} />
                <Route path="/Admin" component={Admin} />
                <Route path="*" component={PageNotFound} />
              </Switch>
            </Content>
            <Footer
              style={{
                textAlign: "center"
              }}
            >
              Sweet Home ©2020
            </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;