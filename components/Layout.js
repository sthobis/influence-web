import { css } from "emotion";
import Router from "next/router";
import NProgress from "nprogress";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Notification from "./Notification";

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
        <main className={styles.container}>{children}</main>
        <Footer />
        <Notification />
      </div>
    );
  }
}

const styles = {
  root: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "stretch",
    height: "auto",
    minHeight: "100vh"
  }),
  container: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    flexGrow: 1,
    position: "relative",
    width: "100%",
    maxWidth: "1200",
    height: "100%",
    margin: "0 auto",
    padding: "0 50px"
  })
};

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

Layout.defaultProps = {
  title: "Igfluencer.id"
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};

export default Layout;
