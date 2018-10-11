import { css } from "emotion";
import Link from "next/link";
import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  FaCreditCard,
  FaRegMeh,
  FaRegSmile,
  FaUserCircle
} from "react-icons/fa";

const formatDate = dateStr => {
  const date = new Date(dateStr);
  return `${date.getDate()}/${date.getMonth() +
    1}/${date.getFullYear()} ${date.getHours()}.${date.getMinutes()}`;
};

class AdvertiserEdit extends Component {
  state = {
    isHoveringPremium: false
  };

  handleMouseOver = () => {
    this.setState({ isHoveringPremium: true });
  };

  handleMouseOut = () => {
    this.setState({ isHoveringPremium: false });
  };

  render() {
    const { advertiser } = this.props;
    const { isHoveringPremium } = this.state;
    return (
      <div className={styles.root}>
        <FaUserCircle className={styles.icon} />
        <h1 className={styles.name}>{advertiser.name}</h1>
        <h2 className={styles.email}>{advertiser.email}</h2>
        <div className={styles.premium}>
          {new Date(advertiser.premiumExpiredAt) > new Date() ? (
            <>
              <p className={styles.premiumText}>
                you are currently on{" "}
                <Link href="/#pricing">
                  <a>premium plan</a>
                </Link>{" "}
                with full features activated
              </p>
              <FaRegSmile className={styles.premiumIcon} />
              <p className={styles.premiumText}>
                thanks for making us smile!
                <br />
                have any suggestion or feature you would like to see?{" "}
                <Link href="/#contact">
                  <a>let us know</a>
                </Link>
              </p>
              <span className={styles.expiration}>
                expires on {formatDate(advertiser.premiumExpiredAt)}
              </span>
            </>
          ) : (
            <>
              <p className={styles.premiumText}>
                you are currently on{" "}
                <Link href="/#pricing">
                  <a>free plan</a>
                </Link>{" "}
                with limited features
              </p>
              {isHoveringPremium ? (
                <FaRegSmile className={styles.premiumIcon} />
              ) : (
                <FaRegMeh className={styles.premiumIcon} />
              )}
              <p className={styles.premiumText}>
                upgrade to{" "}
                <Link href="/#pricing">
                  <a
                    onMouseOver={this.handleMouseOver}
                    onMouseOut={this.handleMouseOut}
                  >
                    premium plan
                  </a>
                </Link>{" "}
                to get full features
                <br />
                you will also make us smile by doing so!
              </p>
              <button
                className={styles.upgradeButton}
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
              >
                <FaCreditCard /> Upgrade
              </button>
            </>
          )}
        </div>
      </div>
    );
  }
}

const styles = {
  root: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: "0 0 75px 0",
    padding: 50,
    backgroundColor: "#fff",
    borderRadius: 5,
    boxShadow: "0 0 30px rgba(35, 0, 95, 0.05)",
    textAlign: "center"
  }),
  icon: css({
    width: 70,
    height: 70,
    color: "#ccc",
    margin: "0 0 20px 0"
  }),
  name: css({
    margin: "0 0 2px 0"
  }),
  email: css({
    margin: "0 0 40px 0"
  }),
  premium: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    fontSize: 16
  }),
  premiumText: css({
    margin: 0,
    lineHeight: "1.5",
    "& a": {
      color: "inherit",
      fontWeight: 700
    }
  }),
  premiumIcon: css({
    color: "#39bdcc",
    width: 50,
    height: 50,
    margin: "10px 0"
  }),
  upgradeButton: css({
    display: "flex",
    alignItems: "center",
    backgroundColor: "#2e3040",
    border: "none",
    borderRadius: 3,
    margin: "25px 0 0 0",
    padding: "10px 20px",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 18,
    "& svg": {
      marginRight: 10
    }
  }),
  expiration: css({
    margin: "10px 0 0 0",
    fontSize: 14
  })
};

AdvertiserEdit.propTypes = {
  advertiser: PropTypes.shape({
    googleId: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    premiumExpiredAt: PropTypes.string
  }).isRequired
};

export default AdvertiserEdit;
