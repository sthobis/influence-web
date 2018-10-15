import { css } from "emotion";
import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import CONFIG from "../config";
import { setLanguage } from "../store";
import Localize from "./Localize";

const Footer = ({ language, toggleLanguage }) => (
  <Localize selector="components.footer">
    {localized => (
      <footer className={styles.root}>
        <div className={styles.container}>
          <nav className={styles.sitemap}>
            <Link href="/">
              <a>{localized[0]}</a>
            </Link>
            <Link href="/influencer">
              <a>Influencer</a>
            </Link>
            <Link href="/termsandconditions">
              <a>{localized[1]}</a>
            </Link>
            <Link href="/privacypolicy">
              <a>{localized[2]}</a>
            </Link>
            <a href="mailto:igfluencer.id@gmail.com?Subject=Hi%20Igfluencer">
              {localized[3]}
            </a>
          </nav>
          <div className={styles.rightSection}>
            <div
              className={styles.language}
              title={
                language === CONFIG.LANGUAGE.ID
                  ? "Bahasa Indonesia"
                  : "English - United States"
              }
            >
              <span>{language}</span>
              <button type="button" onClick={toggleLanguage}>
                {language === CONFIG.LANGUAGE.ID ? (
                  <img
                    src="/static/images/flag-id.svg"
                    alt="Bahasa Indonesia"
                  />
                ) : (
                  <img
                    src="/static/images/flag-us.svg"
                    alt="English - United States"
                  />
                )}
              </button>
            </div>
            <span className={styles.copyright}>
              igfluencer.id <span>'18</span>
            </span>
          </div>
        </div>
      </footer>
    )}
  </Localize>
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
    padding: "25px 50px",
    "@media (max-width: 959px)": {
      flexDirection: "column",
      paddingLeft: 30,
      paddingRight: 30
    }
  }),
  sitemap: css({
    display: "flex",
    "& a": {
      margin: "0 25px 0 0",
      textDecoration: "none",
      color: "#fff",
      fontSize: 15
    },
    "@media (max-width: 959px)": {
      marginBottom: 25
    },
    "@media (max-width: 767px)": {
      marginBottom: 15,
      flexDirection: "column",
      alignItems: "center",
      "& a": {
        margin: "0 0 10px 0"
      }
    }
  }),
  rightSection: css({
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    "@media (max-width: 767px)": {
      flexDirection: "column",
      alignItems: "center"
    }
  }),
  language: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 20px 0 0",
    "& span": {
      color: "#fff",
      fontSize: 13,
      fontWeight: 600,
      margin: "3px 0 0 0"
    },
    "& button": {
      display: "flex",
      padding: 0,
      background: "transparent",
      border: "none",
      cursor: "pointer",
      margin: "0 0 0 10px"
    },
    "& img": {
      width: 30,
      borderRadius: 3
    },
    "@media (max-width: 767px)": {
      margin: "0 0 15px 0"
    }
  }),
  copyright: css({
    display: "flex",
    alignItems: "baseline",
    color: "#fff",
    fontWeight: 600,
    fontSize: 15,
    "& span": {
      fontSize: 13,
      margin: "0 0 0 5px"
    }
  })
};

Footer.propTypes = {
  language: PropTypes.oneOf([CONFIG.LANGUAGE.ID, CONFIG.LANGUAGE.US])
    .isRequired,
  toggleLanguage: PropTypes.func.isRequired
};

const stateToProps = ({ language }) => ({ language });

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  toggleLanguage: () => {
    if (stateProps.language === CONFIG.LANGUAGE.ID) {
      dispatchProps.setLanguage(CONFIG.LANGUAGE.US);
    } else {
      dispatchProps.setLanguage(CONFIG.LANGUAGE.ID);
    }
  }
});

export default connect(
  stateToProps,
  { setLanguage },
  mergeProps
)(Footer);
