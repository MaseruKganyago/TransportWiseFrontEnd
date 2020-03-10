import { ACCESS_TOKEN_NAME } from 'app-constants';

export const userInformation = () => {
  const token = localStorage.getItem(ACCESS_TOKEN_NAME);
  const user = JSON.parse(token);

  return user.userInfo;
};
