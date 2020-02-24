import React from 'react';
import './styles.scss';
import { Button, Result } from 'antd';

export default function RegistrationSuccesful() {
  function handleRouteLog() {
    window.location.href = '/sign-in';
  }

  return (
    <div className="container-success">
      {/* <h1 className="head">Congratulations!! your registration was successful. </h1>
      <p className="SubTitle">Let's discuss transport</p>
      <br />
      <Button type="primary" onClick={handleRouteLog}>
        Login
      </Button> */}
      <Result
        status="success"
        title="Congratulations!! your registration was successful."
        subTitle="Let's discuss transport."
        extra={[
          <Button type="primary" onClick={handleRouteLog}>
            Login
          </Button>,
        ]}
      />
    </div>
  );
}
