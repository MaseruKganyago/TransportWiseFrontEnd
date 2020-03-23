import React, { useState } from 'react';
import { useAccountForgotPassword } from 'api/myApis';
import { Input, Alert, notification } from 'antd';
import { Button } from 'antd';
import './styles.scss';
import { FORGOT_TOKEN } from 'app-constants';
//import emailjs from "emailjs-com";

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { mutate: passEmail, error } = useAccountForgotPassword({});

  const openNotification = () => {
    notification.open({
      message: 'Forgot Password',
      duration: 0,
      description:
        'Password Reset confirmation link has been sent to your email. Open your emails to reset your password.',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  const handleSubmit = () => {
    passEmail({ email: email })
      .then(response => {
        console.log(response);
        localStorage.setItem(FORGOT_TOKEN, JSON.stringify(response));
        //Mail();
        openNotification();
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
