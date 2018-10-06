import { css } from "emotion";
import Link from "next/link";
import React from "react";
import { connect } from "react-redux";
import CONFIG from "../config";
import { removeUser } from "../store";
import getUserGroup from "../utils/getUserGroup";

const Header = ({ user, accessToken, removeUser }) => (
  <header className={styles.root}>
    <Link href="/">
      <a className={styles.link}>insert-logo-here</a>
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
    margin: "30px 0"
  }),
  nav: css({
    "& > *": {
      marginRight: 20,
      "&:last-child": {
        marginRight: 0
      }
    }
  }),
  link: css({
    display: "inline-block",
    background: "transparent",
    border: "none",
    textDecoration: "none",
    color: "#111",
    fontSize: 18,
    fontWeight: 600,
    margin: 0,
    padding: 10,
    cursor: "pointer"
  })
};

const stateToProps = ({ user, accessToken }) => ({ user, accessToken });

export default connect(
  stateToProps,
  { removeUser }
)(Header);
