import { useState } from 'react';
import { useAccountResetPassword } from 'api/myApis';
import { Alert, Input, Button, Icon } from 'antd';

export const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  const { mutate: Reset, error } = useAccountResetPassword({});

  const handleSubmit = () => {
    Reset({ email, password, confirmPassword })
      .then(response => {
        console.log(response);
        window.location.href = '/sign-in';
      })
      .catch(err => console.log(err.response));
  };
  return (
    <div className="ForgotPassword">
      <h1 className="head">This is the ResetPassword Page</h1>
      {error && (
        <Alert
          message="Invalid"
          description="Please check your passwords if whether they match, or the follow alpha numeric. "
          type="error"
          showIcon
          closable
        />
      )}
      <br />
      <Input
        prefix={<Icon type="mail" />}
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Enter Email"
      />
      <br />
      <br />
      <Input
        prefix={<Icon type="lock" />}
        value={password}
        type="password"
        required
        onChange={e => setPassword(e.target.value)}
        placeholder="Enter Password"
      />
      <br />
      <br />
      <Input
        prefix={<Icon type="lock" />}
        value={confirmPassword}
        type="password"
        required
        onChange={e => setconfirmPassword(e.target.value)}
        placeholder="Confirm Password"
      />
      <br />
      <br />
      <Button type="primary" onClick={handleSubmit}>
        ResetPassword
      </Button>
    </div>
  );
};

export default ResetPassword;
