import React, { useState } from "react";
import { Divider, Menu } from "antd";
import { useHistory } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

function Property() {
  const [current, setCurrent] = useState("mail");
  const handleClick = e => {
    setCurrent(e.key);
  };

  let { path, url } = useRouteMatch();

  return (
    <Router>
      <h1 className="header-title">Property</h1>

      <div className="main-container">
        <div>
          <Menu
            onClick={handleClick}
            selectedKeys={[current]}
            mode="horizontal"
          >
            <Menu.Item key="mail">
              Add Property<Link to={`${url}/test`}></Link>
            </Menu.Item>
            <Menu.Item key="app">
              Search Property<Link to={`${url}/tester`}></Link>
            </Menu.Item>
          </Menu>
          <Switch>
            <Route exact path={path} component={done} />
            <Route path={`${path}/test`} component={test} />
            <Route path={`${path}/tester`} component={tester} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

function done() {
  let { path, url } = useRouteMatch();
  let history = useHistory();
  history.push(`${path}/test`)
  return <div>done load</div>;
}

function test() {
  return <div>test</div>;
}
function tester() {
  return <div>tester</div>;
}

export default Property;
