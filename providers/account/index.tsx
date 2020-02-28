import { AccountStateContext, AccountActionsContext, AuthTokenStateContext } from './contexts';
import React, { PropsWithChildren, FC, useContext, useReducer, useState, useEffect } from 'react';
import { accountReducer } from './reducer';
import { LoginViewModel, useAccountLogin } from 'api/myApis';
import { loginUserAction, loginUserSuccessAction, loginUserErrorAction } from './actions';
import { ACCESS_TOKEN_NAME } from 'app-constants';
import { useRouter } from 'next/router';
//import { Handler } from 'utils/handler';

interface IProps extends PropsWithChildren<any> {}

const AccountProvider: FC<IProps> = ({ children }) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(accountReducer, {});
  const [authtoken, setAuthtoken] = useState(null);
  const { mutate: loginUserHttp } = useAccountLogin({});
  const loginUser = (payload: LoginViewModel) => {
    dispatch(loginUserAction());

    loginUserHttp(payload)
      .then(data => {
        setAuthtoken(data);
        dispatch(loginUserSuccessAction(data));
        console.log(data);
        router.push('/fuel-wise');
      })
      .catch(() => {
        dispatch(loginUserErrorAction('Invalide Email or Password, please check your details and try again.'));
      });
  };

  useEffect(() => {
    if (!authtoken) {
      const tokenstring = sessionStorage.getItem(ACCESS_TOKEN_NAME);
      const token = JSON.parse(tokenstring);
      setAuthtoken(token);
    } else {
      sessionStorage.setItem(ACCESS_TOKEN_NAME, JSON.stringify(authtoken));
    }
  }, [authtoken]);

  return (
    <AccountStateContext.Provider value={state}>
      <AccountActionsContext.Provider value={{ loginUser }}>
        <AuthTokenStateContext.Provider value={authtoken}>{children}</AuthTokenStateContext.Provider>
      </AccountActionsContext.Provider>
    </AccountStateContext.Provider>
  );
};

function useAccountState() {
  const context = useContext(AccountStateContext);
  if (context === undefined) {
    throw new Error('useAccountState must be used within a CountProvider');
  }
  return context;
}

function useAccountActions() {
  const context = useContext(AccountActionsContext);
  if (context === undefined) {
    throw new Error('useAccountActions must be used within a CountProvider');
  }
  return context;
}

export { AccountProvider, useAccountState, useAccountActions };
