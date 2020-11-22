import React from "react";
import { Button, Result } from "antd";
import { useHistory } from "react-router-dom";

const NoMatch = () => {
  const history = useHistory();
  const goHome = () => {
    history.replace("/");
  };

  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={goHome}>
            Back Home
          </Button>
        }
      />
      ,
    </div>
  );
};

export default NoMatch;
