import React from "react";
import "antd/dist/antd.css";
import { Layout, Menu, Icon, Dropdown,Avatar } from "antd";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "./components/dashboard/dashboard";
import Property from "./components/property/property";
import Tenant from "./components/tenant/tenant";
import Report from "./components/report/report";
import Admin from "./components/admin/admin";
import PageNotFound from "./PageNotFound";

const { Header, Content, Footer, Sider } = Layout;

const menu = (
  <Menu>
    <Menu.Item key="0">
      <div>test</div>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="http://www.taobao.com/">2nd menu item</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">logout</Menu.Item>
  </Menu>
);

class App extends React.Component {
  state = {
    collapsed: false
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
                background: '#fff',
                boxShadow: '0 5px 15px rgba(57, 98, 254, 0.02), 0 3px 6px rgba(117, 108, 254, 0.12)',
                padding: 0,
                marginLeft: this.state.collapsed ? 80 : 200,
                transition: "all 0.2s",
                position:"fixed",
                height:60,
                width: this.state.collapsed ? 'calc(100% - 80px)' : 'calc(100% - 200px)',
              }}
            >
              <Icon
              style={{fontSize:16,padding:18}}
                className="trigger"
                type="menu"
                onClick={this.toggle}
              />
              
              <Dropdown overlay={menu} trigger={['click']}>
                <a style={{float:"right",paddingRight:10,height:60}} onClick={e => e.preventDefault()}>
                <Avatar size={28} icon="user" />
                </a>
              </Dropdown>
            </Header>
            <Content style={{ marginLeft: this.state.collapsed ? 80 : 200, overflow: "initial",transition: "all 0.2s",marginTop:68,padding:10 }}>
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/Property" component={Property} />
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
              Sweet Home {(new Date().getFullYear())}
            </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
