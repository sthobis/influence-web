import { css } from "emotion";
import Link from "next/link";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { removeUser } from "../store";

const Header = ({ user, logout }) => (
  <header className={styles.root}>
    <Link href="/">
      <a className={styles.link}>insert-logo-here</a>
    </Link>
    <nav className={styles.nav}>
      <Link href="/influencers">
        <a className={styles.link}>influencers</a>
      </Link>
      {user ? (
        <button className={styles.link} onClick={logout}>
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

const stateToProps = ({ user }) => ({ user });

const dispatchToProps = dispatch => ({
  logout: bindActionCreators(removeUser, dispatch)
});

export default connect(
  stateToProps,
  dispatchToProps
)(Header);
