import React from "react";
import { Result, Button } from "antd";
import { useHistory } from "react-router-dom";

function PageNotFound() {
  let history = useHistory();
  function Home() {
    history.push("/");
  }
  return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={Home}>
            Back Home
          </Button>
        }
      />
  );
}

export default PageNotFound;
