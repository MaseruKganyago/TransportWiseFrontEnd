import React from 'react';
import App from 'next/app';
import { CustomNProgress } from 'components';
import { RestfulProvider } from 'restful-react';
import { BASE_URL } from 'api/utils/constants';
import { RouteProvider, AuthProvider, GlobalProvider } from 'providers';
import { DesignContext } from 'contexts';
import { defaultDesignContext } from 'contexts/designContext';
import { AccountProvider } from 'providers/account';
import { ReigsterProvider } from 'providers/registration';

interface IState {
  headers: { [key: string]: string };
  tokenIsSet: boolean;
  token: string;
}

export default class Main extends App<{}, {}, IState> {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return { pageProps };
  }

  constructor(props) {
    super(props);
    this.state = {
      headers: {},
      tokenIsSet: false,
      token: '',
    };
  }

  componentDidMount() {
    this.setRequestHeaders();
  }

  componentWillReceiveProps() {
    if (!this.state.tokenIsSet) {
      this.setRequestHeaders(); // Try to update the the headers until you are successful
    }
  }

  setRequestHeaders() {
    import('utils/requestHeaders').then(({ requestHeaders, getToken }) => {
      const headers = requestHeaders();

      this.setState({ headers: requestHeaders(), tokenIsSet: !!headers.Authorization, token: getToken() });
    });
  }

  render() {
    const { Component, pageProps } = this.props;
    console.log('headers', this.state.headers);
    return (
      <RestfulProvider
        queryParams={{ token: this.state.token }}
        base={BASE_URL}
        requestOptions={{
          headers: this.state.headers,
        }}
      >
        <GlobalProvider>
          <CustomNProgress />

          <RouteProvider>
            <AuthProvider>
              <ReigsterProvider>
                <AccountProvider>
                  <DesignContext.Provider value={defaultDesignContext}>
                    <Component {...pageProps} />
                  </DesignContext.Provider>
                </AccountProvider>
              </ReigsterProvider>
            </AuthProvider>
          </RouteProvider>
        </GlobalProvider>
      </RestfulProvider>
    );
  }
}
