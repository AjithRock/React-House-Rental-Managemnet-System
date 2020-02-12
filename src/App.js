import React from "react";
import "antd/dist/antd.css";
import { Layout, Menu, Icon ,Tabs} from "antd";
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Dashboard from './components/dashboard/dashboard'
import Property from './components/property/property'

const { Header, Content, Footer, Sider } = Layout;
const { TabPane } = Tabs;

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
                <Route exact path="/">
                  <Dashboard />
                </Route>
                <Route path="/Property">
                  <Property />
                </Route>
                <Route path="/Tenant">
                  <Tenant />
                </Route>
                <Route path="/Report">
                  <Report />
                </Route>
                <Route path="/Admin">
                  <Admin />
                </Route>
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




function Tenant() {
  return (
    <div
      style={{
        padding: 24,
        background: "#fff",
        minHeight: 360
      }}
    >
      Tenant
    </div>
  );
}

function Report() {
  return (
    <div
      style={{
        padding: 24,
        background: "#fff",
        minHeight: 360
      }}
    >
      Report
    </div>
  );
}

function Admin() {
  return (
    <div
      style={{
        padding: 24,
        background: "#fff",
        minHeight: 360
      }}
    >
      Admin
      <Tabs defaultActiveKey="1" >
        <TabPane tab="Tab 1" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
      
    </div>
    
  );
}

export default App;