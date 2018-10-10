import { css, cx } from "emotion";
import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";

const Footer = ({ className }) => (
  <footer className={className ? cx(styles.root, className) : styles.root}>
    <nav className={styles.sitemap}>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/influencer">
        <a>Influencer</a>
      </Link>
      <Link href="/termsandconditions">
        <a>Terms and Conditions</a>
      </Link>
      <Link href="/privacypolicy">
        <a>Privacy Policy</a>
      </Link>
    </nav>
    <a href="https://twitter.com/iBoht" className={styles.copyright}>
      <span>contact us</span>
      👍🏻
    </a>
  </footer>
);

const styles = {
  root: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "35px 0 30px 0"
  }),
  sitemap: css({
    display: "flex",
    "& a": {
      margin: "0 30px 0 0",
      textDecoration: "none",
      color: "#fff"
    }
  }),
  copyright: css({
    display: "flex",
    alignItems: "center",
    color: "#fff",
    margin: "0 0 0 10px",
    textDecoration: "none",
    "& span": {
      margin: "2px 5px 0 0"
    }
  })
};

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
