import { css } from "emotion";
import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";
import { FaCameraRetro } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { connect } from "react-redux";
import CONFIG from "../config";
import { removeUser } from "../store";
import getUserGroup from "../utils/getUserGroup";

const Header = ({ user, accessToken, removeUser }) => (
  <header className={styles.root}>
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
            <a className={styles.link}>
              my account <FiArrowRight />
            </a>
          </Link>
        )}
      {accessToken &&
        getUserGroup(accessToken) === CONFIG.GROUP.ADVERTISER && (
          <Link href="/advertiser/edit">
            <a className={styles.link}>
              my account <FiArrowRight />
            </a>
          </Link>
        )}
      <Link href="/influencer">
        <a className={styles.link}>
          influencers <FiArrowRight />
        </a>
      </Link>
      {user ? (
        <button className={styles.link} onClick={removeUser}>
          logout <FiArrowRight />
        </button>
      ) : (
        <Link href="/login">
          <a className={styles.link}>
            login <FiArrowRight />
          </a>
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
    width: "100%",
    maxWidth: 1200,
    margin: "0 auto",
    padding: "40px 50px"
  }),
  logo: css({
    display: "flex",
    alignItems: "center",
    padding: "10px 15px",
    backgroundColor: "#181a28",
    color: "#fff",
    textDecoration: "none",
    borderRadius: 3,
    fontWeight: 600,
    "& svg": {
      marginRight: 10
    }
  }),
  nav: css({
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    "& > *": {
      marginRight: 30,
      "&:last-child": {
        marginRight: 0
      }
    }
  }),
  link: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    backgroundColor: "transparent",
    border: "none",
    color: "#181a28",
    fontWeight: 700,
    textDecoration: "none",
    fontSize: 16,
    textTransform: "uppercase",
    cursor: "pointer",
    "& svg": {
      margin: "0 0 1px 3px",
      transition: ".3s"
    },
    "&:hover": {
      "& svg": {
        transform: "translateX(3px)"
      }
    }
  })
};

Header.propTypes = {
  removeUser: PropTypes.func.isRequired,
  user: PropTypes.object,
  accessToken: PropTypes.string
};

const stateToProps = ({ user, accessToken }) => ({ user, accessToken });

export default connect(
  stateToProps,
  { removeUser }
)(Header);
