import { css } from "emotion";
import Link from "next/link";
import React from "react";

const Footer = () => (
  <footer className={styles.root}>
    <div className={styles.container}>
      <nav className={styles.sitemap}>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/influencer">
          <a>Influencers</a>
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
        igfluencer.id <span>'18</span>
      </span>
    </div>
  </footer>
);

const styles = {
  root: css({
    backgroundColor: "#20223a"
  }),
  container: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxWidth: 1200,
    margin: "0 auto",
    padding: "25px 50px"
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

export default Footer;
