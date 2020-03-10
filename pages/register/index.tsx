import { useRegistrationState, useRegistrationActions } from 'providers/registration';
import { Form, Input, Icon, Button, Alert } from 'antd';
import './styles.scss';
import 'antd/dist/antd.css';
import FormItem from 'antd/lib/form/FormItem';
import { useState } from 'react';

export const Register = () => {
  const { isRegistering, isRegisterError } = useRegistrationState();
  const { registerUser } = useRegistrationActions();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [mobilePhone, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  const handleSubmit = () => {
    registerUser({ name, surname, mobilePhone, email, password, confirmPassword });
  };

  return (
    <div className="register">
      <div className="base-container">
        <div className="header">TransportWise</div>
        <div className="header2">Register here:</div>
        <div className="image">
          <img src="/static/images/town.png" />
        </div>

        {isRegisterError && (
          <Alert
            message="Error"
            description="Invalid Registration, please check your details and try again."
            type="error"
            showIcon
            closable
          />
        )}

        <Form>
          <FormItem>
            <Input placeholder="Enter your Name" required value={name} onChange={e => setName(e.target.value)} />
          </FormItem>

          <FormItem>
            <Input
              placeholder="Enter your Surname"
              required
              value={surname}
              onChange={e => setSurname(e.target.value)}
            />
          </FormItem>

          <FormItem>
            <Input
              placeholder="Enter your CellPhone number (Optional)"
              required
              value={mobilePhone}
              onChange={e => setMobile(e.target.value)}
            />
          </FormItem>

          <FormItem>
            <Input
              prefix={<Icon type="mail" />}
              placeholder="Enter Email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormItem>

          <FormItem>
            <Input.Password
              autoComplete="on"
              prefix={<Icon type="lock" />}
              placeholder="Password"
              required
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </FormItem>

          <FormItem>
            <Input.Password
              autoComplete="on"
              prefix={<Icon type="lock" />}
              placeholder="Confirm Password"
              required
              type="password"
              value={confirmPassword}
              onChange={e => setconfirmPassword(e.target.value)}
            />
          </FormItem>

          <FormItem className="un-authed-btn-container">
            <Button type="primary" onClick={handleSubmit} className="login-form-button" block loading={isRegistering}>
              Register
            </Button>
            <div className="custom-form-item">
              <a href="/sign-in">or Login</a>
            </div>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};

export default Register;
