import { css } from "emotion";
import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";
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

const AdvertiserEdit = ({ advertiser }) => (
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
          <FaRegMeh className={styles.premiumIcon} />
          <p className={styles.premiumText}>
            upgrade to{" "}
            <Link href="/#pricing">
              <a>premium plan</a>
            </Link>{" "}
            to get full features
            <br />
            you will also make us smile by doing so!
          </p>
          <button className={styles.upgradeButton}>
            <FaCreditCard /> Upgrade
          </button>
        </>
      )}
    </div>
  </div>
);

const styles = {
  root: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
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
      fontWeight: 600
    }
  }),
  premiumIcon: css({
    color: "turquoise",
    width: 50,
    height: 50,
    margin: "10px 0"
  }),
  upgradeButton: css({
    display: "flex",
    alignItems: "center",
    backgroundColor: "turquoise",
    border: "none",
    borderRadius: 5,
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
