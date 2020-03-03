//import { getAccessToken } from './auth';
import { getLocalizationOrDefault } from './localization';
import { getTenantId } from './multitenancy';
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

  headers['.AspNetCore.Culture'] = getLocalizationOrDefault();

  const tenantId = getTenantId();

  if (tenantId) {
    headers['Abp.TenantId'] = getTenantId().toString();
  }
  console.log('headers', headers);
  return headers;
};
