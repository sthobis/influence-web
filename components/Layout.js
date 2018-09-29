import { css, injectGlobal } from "emotion";
import Router from "next/router";
import NProgress from "nprogress";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import Footer from "./Footer";
import Header from "./Header";

class Layout extends PureComponent {
  componentDidMount() {
    const { title } = this.props;
    document.title = title;
  }

  render() {
    const { children } = this.props;
    return (
      <div className={styles.root}>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    );
  }
}

const styles = {
  root: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "center",
    position: "relative",
    width: "100%",
    maxWidth: "1200",
    height: "auto",
    minHeight: "100vh",
    margin: "0 auto",
    padding: "0 30px"
  })
};

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    background-color: #f5f8fa;
  }

  * {
    box-sizing: border-box;
    font-family: "Open Sans", sans-serif;
  }

  *:focus:not(:focus-visible) {
    outline: none;
  }

  #nprogress {
    pointer-events: none;

    .bar {
      background: turquoise;
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
      box-shadow: 0 0 10px turquoise, 0 0 5px turquoise;
      opacity: 1;
      transform: rotate(3deg) translate(0px, -4px);
    }
  }
`;

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

Layout.defaultProps = {
  title: "Influence"
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
};

export default Layout;
