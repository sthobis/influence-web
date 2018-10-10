import axios from "axios";
import { injectGlobal } from "emotion";
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

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    background-color: #f5f8fa;
    background-color: #fff;
    color: #181a28;
    font-size: 16px;
    line-height: 1.25;
  }

  * {
    box-sizing: border-box;
    font-family: 'Nunito', sans-serif;
  }

  h1, h2, h3, h4, h5 {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }

  *:focus:not(:focus-visible) {
    outline: none;
  }

  #nprogress {
    pointer-events: none;

    .bar {
      background: #181a28;
      position: fixed;
      z-index: 1031;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
    }

    .peg {
      display: block;
      position: absolute;
      right: 0px;
      width: 100px;
      height: 100%;
      box-shadow: 0 0 10px #000, 0 0 5px #181a28;
      opacity: 1;
      transform: rotate(3deg) translate(0px, -4px);
    }
  }
`;

export default withRedux(store)(MyApp);
