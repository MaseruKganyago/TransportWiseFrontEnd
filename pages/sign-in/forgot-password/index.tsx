import React, { useState } from 'react';
import { useAccountForgotPassword } from 'api/myApis';
import { Input, Alert } from 'antd';
import { Button } from 'antd';
import './styles.scss';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const { mutate: passEmail, error } = useAccountForgotPassword({});

  const handleSubmit = () => {
    passEmail({ email })
      .then(response => {
        console.log(response);
        window.location.href = './reset-password';
      })
      .catch(err => console.log(err.response));
  };

  return (
    <div className="ForgotPassword">
      <h1 className="head">This is the ForgotPassword Page</h1>
      <p className="SubTitle">Note!! Please use a password that you can always remember.</p>
      {error && (
        <Alert
          message="Invalid Email"
          description="Either user is not registered, or incorrect Email. Please check your details and try again."
          type="error"
          showIcon
          closable
        />
      )}
      <br />
      <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter Email" />
      <br />
      <br />
      <Button type="primary" onClick={handleSubmit}>
        Submit Email
      </Button>
    </div>
  );
};

export default ForgotPassword;