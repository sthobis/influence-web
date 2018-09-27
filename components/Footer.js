import { css } from "emotion";
import React from "react";

const Footer = () => <footer className={styles.root}>© influence 2018</footer>;

const styles = {
  root: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    margin: "50px 0"
  })
};

export default Footer;
