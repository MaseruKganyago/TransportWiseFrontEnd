import { createContext } from 'react';
import { RegisterViewModel } from 'api/myApis';

export interface IRegistrationState {
  isRegistering?: boolean;
  isRegisterError?: string;
  registeredResponse?: any;
}

export interface IRegistrationActions {
  registerUser?: (payload: RegisterViewModel) => void;
}

export const RegistrationStateContext = createContext<IRegistrationState>({});
export const RegistrationActionsContext = createContext<IRegistrationActions>({});
