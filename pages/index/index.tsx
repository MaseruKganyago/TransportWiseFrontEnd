import React from 'react';
import './styles.scss';
import { useRouter } from 'next/router';
import { ACCESS_TOKEN_NAME } from 'app-constants';
import { message } from 'antd';

export default function Home() {
  const route = useRouter();
  function handleRoute() {
    const tokenstr = localStorage.getItem(ACCESS_TOKEN_NAME);

    const token = JSON.parse(tokenstr);

    if (token) {
      route.push('/fuel-wise');
      message.success('Automatically succesfully Logged In');
    } else {
      route.push('/sign-in');
    }
  }
  function handleRouteReg() {
    route.push('/register');
    //window.location.href = '/register';
  }
  return (
    <div className="maincontainer">
      <div className="container">
        <h1 className="BigTitle">Welcome to TransportWise</h1>
        <p className="SubTitle">Let's discuss transport</p>
        <br />
        <button type="button" className="btn1" onClick={handleRoute}>
          Login
        </button>
        <br /> <br />
        <button type="button" className="btn2" onClick={handleRouteReg}>
          Register
        </button>
      </div>
    </div>
  );
}
