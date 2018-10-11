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
      <a href="mailto:igfluencer.id@gmail.com?Subject=Hi%20Igfluencer">
        Contact
      </a>
    </nav>
    <span className={styles.copyright}>
      igluencer.id <span>'18</span>
    </span>
  </footer>
);

const styles = {
  root: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "25px 0",
    backgroundColor: "#20223a"
  }),
  sitemap: css({
    display: "flex",
    "& a": {
      margin: "0 25px 0 0",
      textDecoration: "none",
      color: "#fff",
      fontSize: 15
    }
  }),
  copyright: css({
    display: "flex",
    alignItems: "baseline",
    color: "#fff",
    fontWeight: 600,
    "& span": {
      fontSize: 13,
      margin: "0 0 0 5px"
    }
  })
};

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
