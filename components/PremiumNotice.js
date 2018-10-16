import { css } from "emotion";
import Link from "next/link";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { FaCreditCard, FaRegMeh, FaRegSmile } from "react-icons/fa";
import Localize from "./Localize";

const formatDate = dateStr => {
  const date = new Date(dateStr);
  return `${date.getDate()}/${date.getMonth() +
    1}/${date.getFullYear()} ${date.getHours()}.${date.getMinutes()}`;
};

class PremiumNotice extends Component {
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
    const { premiumExpiredAt } = this.props;
    const { isHoveringPremium } = this.state;
    return (
      <Localize selector="components.premiumNotice">
        {localized => (
          <div className={styles.premium}>
            {new Date(premiumExpiredAt) > new Date() ? (
              <>
                <p className={styles.premiumText}>
                  {localized[0]}{" "}
                  <Link href="/#pricing">
                    <a>{localized[1]}</a>
                  </Link>{" "}
                  {localized[2]}
                </p>
                <FaRegSmile className={styles.premiumIcon} />
                <p className={styles.premiumText}>
                  {localized[3]}!<br />
                  {localized[4]}?{" "}
                  <Link href="/#contact">
                    <a>{localized[5]}</a>
                  </Link>
                </p>
                <span className={styles.expiration}>
                  {localized[6]} {formatDate(premiumExpiredAt)}
                </span>
              </>
            ) : (
              <>
                <p className={styles.premiumText}>
                  {localized[0]}{" "}
                  <Link href="/#pricing">
                    <a>{localized[7]}</a>
                  </Link>{" "}
                  {localized[8]}
                </p>
                {isHoveringPremium ? (
                  <FaRegSmile className={styles.premiumIcon} />
                ) : (
                  <FaRegMeh className={styles.premiumIcon} />
                )}
                <p className={styles.premiumText}>
                  {localized[9]}{" "}
                  <Link href="/#pricing">
                    <a
                      onMouseOver={this.handleMouseOver}
                      onMouseOut={this.handleMouseOut}
                    >
                      {localized[1]}
                    </a>
                  </Link>{" "}
                  {localized[10]}
                  <br />
                  {localized[11]}!
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
        )}
      </Localize>
    );
  }
}

const styles = {
  premium: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    fontSize: 16,
    textAlign: "center"
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

PremiumNotice.propTypes = {
  premiumExpiredAt: PropTypes.string.isRequired
};

export default PremiumNotice;
