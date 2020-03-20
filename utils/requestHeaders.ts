//import { getAccessToken } from './auth';
import { ACCESS_TOKEN_NAME } from 'app-constants';

export const requestHeaders = (): { [key: string]: string } => {
  const headers: { [key: string]: string } = {};

  //const token = getAccessToken && getAccessToken() && getAccessToken().accessToken;
  const Tokenstr = localStorage.getItem(ACCESS_TOKEN_NAME);

  if (Tokenstr) {
    console.log('tokenReq', Tokenstr);
    const Token = JSON.parse(Tokenstr);
    headers['Authorization'] = `Bearer ${Token.userToken}`;
    //window.location.href = "/fuel-wise"
  }
  return headers;
};
