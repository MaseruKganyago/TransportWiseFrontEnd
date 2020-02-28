import React from 'react';
import './styles.scss';
import { useRouter } from 'next/router';

export default function Home() {
  const route = useRouter();
  function handleRoute() {
    route.push('/sign-in');
    //window.location.href = '/sign-in';
  }
  function handleRouteReg() {
    route.push('/register');
    //window.location.href = '/register';
  }
  return (
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
  );
}
