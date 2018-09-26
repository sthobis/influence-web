import axios from "axios";
import withRedux from "next-redux-wrapper";
import App, { Container } from "next/app";
import React from "react";
import { Provider } from "react-redux";
import store from "../store";

class MyApp extends App {
  static async getInitialProps(props) {
    const { Component, ctx } = props;
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    return { pageProps };
  }

  componentDidMount() {
    const { store } = this.props;
    const { user } = store.getState();
    if (user) {
      // user is logged in and is already saved to store
      // which means setUser was called on server (rehydrated on client)
      // we need to set client's axios header with authentication token
      // for next fetch calls
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(store)(MyApp);
