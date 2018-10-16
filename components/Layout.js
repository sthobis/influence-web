import { css } from "emotion";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import PropTypes from "prop-types";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Notification from "./Notification";

const Layout = ({ title, children }) => (
  <div className={styles.root}>
    <Head>
      <title>{title}</title>
    </Head>
    <Header />
    <main className={styles.container}>{children}</main>
    <Footer />
    <Notification />
  </div>
);

const styles = {
  root: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "stretch",
    height: "auto",
    minHeight: "100vh",
    backgroundColor: "#f6faff"
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
    padding: "0 50px",
    "@media (max-width: 767px)": {
      paddingLeft: 30,
      paddingRight: 30
    }
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
