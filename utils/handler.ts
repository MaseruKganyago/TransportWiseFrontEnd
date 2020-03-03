import { useEffect } from 'react';
import { ACCESS_TOKEN_NAME } from './../app-constants/index';

export const Handler = token => {
  const tokenAuth = JSON.stringify(token);
  useEffect(() => {
    if (tokenAuth) {
      sessionStorage.setItem(ACCESS_TOKEN_NAME, tokenAuth);
      console.log('1');
      console.log(tokenAuth);
      // window.location.href = 'fuel-wise';
    } else {
      console.log('0');
      console.log(tokenAuth);
    }
  }, [tokenAuth]);
  return tokenAuth;
};
