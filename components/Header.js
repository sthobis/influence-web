import { css, cx } from "emotion";
import Link from "next/link";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { FaBars, FaCameraRetro, FaTimes } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { connect } from "react-redux";
import CONFIG from "../config";
import { removeUser } from "../store";
import getUserGroup from "../utils/getUserGroup";
import Localize from "./Localize";

class Header extends Component {
  state = {
    isMobileNavOpened: false
  };

  toggleMobileNav = () => {
    this.setState(prevState => ({
      isMobileNavOpened: !prevState.isMobileNavOpened
    }));
  };

  closeMobileNav = () => {
    this.setState({ isMobileNavOpened: false });
  };

  logout = () => {
    const { removeUser } = this.props;
    this.closeMobileNav();
    removeUser();
  };

  render() {
    const { user, accessToken, removeUser } = this.props;
    const { isMobileNavOpened } = this.state;
    return (
      <Localize selector="components.header">
        {localized => (
          <header
            className={cx(styles.header, {
              [styles.fullScreenHeader]: isMobileNavOpened
            })}
          >
            <Link href="/">
              <a className={styles.logo} onClick={this.closeMobileNav}>
                <FaCameraRetro /> igfluencer.id
              </a>
            </Link>
            <nav
              className={cx(styles.nav, {
                [styles.fullScreenNav]: isMobileNavOpened
              })}
            >
              {accessToken &&
                getUserGroup(accessToken) === CONFIG.GROUP.INFLUENCER && (
                  <Link
                    href={`/influencer/detail?username=${user.instagramHandle}`}
                    as={`/influencer/detail/${user.instagramHandle}`}
                  >
                    <a className={styles.link} onClick={this.closeMobileNav}>
                      {localized[0]} <FiArrowRight />
                    </a>
                  </Link>
                )}
              {accessToken &&
                getUserGroup(accessToken) === CONFIG.GROUP.ADVERTISER && (
                  <Link href="/agency/edit">
                    <a className={styles.link} onClick={this.closeMobileNav}>
                      {localized[0]} <FiArrowRight />
                    </a>
                  </Link>
                )}
              <Link href="/influencer">
                <a className={styles.link} onClick={this.closeMobileNav}>
                  influencer <FiArrowRight />
                </a>
              </Link>
              {user ? (
                <button className={styles.link} onClick={this.logout}>
                  {localized[1]} <FiArrowRight />
                </button>
              ) : (
                <Link href="/login">
                  <a className={styles.link} onClick={this.closeMobileNav}>
                    {localized[2]} <FiArrowRight />
                  </a>
                </Link>
              )}
            </nav>
            <button
              onClick={this.toggleMobileNav}
              className={cx(styles.menuButton, {
                [styles.fullScreenMenuButton]: isMobileNavOpened
              })}
            >
              {isMobileNavOpened ? <FaTimes /> : <FaBars />}
            </button>
          </header>
        )}
      </Localize>
    );
  }
}

const styles = {
  header: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxWidth: 1200,
    margin: "0 auto",
    padding: "40px 50px",
    "@media (max-width: 767px)": {
      paddingLeft: 30,
      paddingRight: 30
    }
  }),
  fullScreenHeader: css({
    "@media (max-width: 767px)": {
      position: "fixed",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      zIndex: 10000,
      backgroundColor: "#fff"
    }
  }),
  logo: css({
    display: "flex",
    justifyContent: "center",
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
    },
    "@media (max-width: 767px)": {
      display: "none"
    }
  }),
  fullScreenNav: css({
    "@media (max-width: 767px)": {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      width: "100%",
      "& > *": {
        marginRight: 0,
        justifyContent: "flex-start",
        "&:first-child": {
          marginTop: 15
        },
        "&:last-child": {
          marginBottom: 15
        }
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
    padding: 0,
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
  }),
  menuButton: css({
    display: "none",
    "@media (max-width: 767px)": {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      width: 40,
      height: 40,
      padding: 0,
      fontSize: 20,
      background: "transparent",
      border: "none"
    }
  }),
  fullScreenMenuButton: css({
    position: "absolute",
    top: 40,
    right: 30
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
