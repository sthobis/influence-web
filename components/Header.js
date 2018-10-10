import { css, cx } from "emotion";
import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";
import { FaCameraRetro } from "react-icons/fa";
import { connect } from "react-redux";
import CONFIG from "../config";
import { removeUser } from "../store";
import getUserGroup from "../utils/getUserGroup";

const Header = ({ user, accessToken, removeUser, className }) => (
  <header className={className ? cx(styles.root, className) : styles.root}>
    <Link href="/">
      <a className={styles.logo}>
        <FaCameraRetro /> igfluencer.id
      </a>
    </Link>
    <nav className={styles.nav}>
      {accessToken &&
        getUserGroup(accessToken) === CONFIG.GROUP.INFLUENCER && (
          <Link
            href={`/influencer/detail?username=${user.instagramHandle}`}
            as={`/influencer/detail/${user.instagramHandle}`}
          >
            <a className={styles.link}>my account</a>
          </Link>
        )}
      {accessToken &&
        getUserGroup(accessToken) === CONFIG.GROUP.ADVERTISER && (
          <Link href="/advertiser/edit">
            <a className={styles.link}>my account</a>
          </Link>
        )}
      <Link href="/influencer">
        <a className={styles.link}>influencers</a>
      </Link>
      {user ? (
        <button className={styles.link} onClick={removeUser}>
          logout
        </button>
      ) : (
        <Link href="/login">
          <a className={styles.link}>login</a>
        </Link>
      )}
    </nav>
  </header>
);

const styles = {
  root: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "40px 0"
  }),
  logo: css({
    display: "flex",
    alignItems: "center",
    padding: "10px 15px",
    backgroundColor: "#181a28",
    color: "#fff",
    textDecoration: "none",
    borderRadius: 3,
    fontWeight: 700,
    "& svg": {
      marginRight: 10
    }
  }),
  nav: css({
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    "& > *": {
      marginRight: 20,
      "&:last-child": {
        marginRight: 0
      }
    }
  }),
  link: css({
    display: "flex",
    alignItems: "center",
    padding: "10px 15px",
    backgroundColor: "#181a28",
    color: "#fff",
    textDecoration: "none",
    borderRadius: 3,
    "& svg": {
      marginLeft: 10
    }
  })
};

Header.propTypes = {
  removeUser: PropTypes.func.isRequired,
  user: PropTypes.object,
  accessToken: PropTypes.string,
  className: PropTypes.string
};

const stateToProps = ({ user, accessToken }) => ({ user, accessToken });

export default connect(
  stateToProps,
  { removeUser }
)(Header);
