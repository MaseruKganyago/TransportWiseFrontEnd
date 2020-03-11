import { LoginViewModel } from 'api/myApis';
import { createContext } from 'react';

export interface IToken {
  userToken: string;
}

export interface IAccountStateContext {
  isLoggingIn?: boolean;
  loginUserError?: string;
  loginResponse?: any;
}

export interface IAccountActionsContext {
  loginUser?: (payload: LoginViewModel) => void;
}

export const AccountStateContext = createContext<IAccountStateContext>({});

export const AuthTokenStateContext = createContext<IToken>(null);

export const AccountActionsContext = createContext<IAccountActionsContext>({});
