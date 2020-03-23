import { RegisterViewModel, useAccountRegister } from 'api/myApis';
import { FC, useReducer, useContext, PropsWithChildren } from 'react';
import { registraionReducer } from './reducer';
import { registerUserAction, registerUserSuccessAction, registerUserErrorAction } from './action';
import { RegistrationStateContext, RegistrationActionsContext } from 'contexts/contexts';
import { useRouter } from 'next/router';

interface IProps extends PropsWithChildren<any> {}

const ReigsterProvider: FC<IProps> = ({ children }) => {
  const [state, dispatch] = useReducer(registraionReducer, {});
  const router = useRouter();
  const { mutate: registerUserHttp } = useAccountRegister({});

  const registerUser = (payload: RegisterViewModel) => {
    dispatch(registerUserAction());

    registerUserHttp(payload)
      .then(data => {
        dispatch(registerUserSuccessAction(data));
        router.push('/register/registersuccess');
      })
      .catch(() => {
        dispatch(registerUserErrorAction('Invalid Registration'));
      });
  };
  return (
    <RegistrationStateContext.Provider value={state}>
      <RegistrationActionsContext.Provider value={{ registerUser }}>{children}</RegistrationActionsContext.Provider>
    </RegistrationStateContext.Provider>
  );
};

function useRegistrationState() {
  const context = useContext(RegistrationStateContext);
  if (context === undefined) {
    throw new Error('useAccountState must be used within a CountProvider');
  }
  return context;
}

function useRegistrationActions() {
  const context = useContext(RegistrationActionsContext);
  if (context === undefined) {
    throw new Error('useAccountActions must be used within a CountProvider');
  }
  return context;
}

export { ReigsterProvider, useRegistrationState, useRegistrationActions };
