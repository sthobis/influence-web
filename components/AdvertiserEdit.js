import { css } from "emotion";
import PropTypes from "prop-types";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import PremiumNotice from "./PremiumNotice";

const AdvertiserEdit = ({ advertiser }) => (
  <div className={styles.root}>
    <FaUserCircle className={styles.icon} />
    <h1 className={styles.name}>{advertiser.name}</h1>
    <h2 className={styles.email}>{advertiser.email}</h2>
    <PremiumNotice premiumExpiredAt={advertiser.premiumExpiredAt} />
  </div>
);

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
    textAlign: "center",
    "@media (max-width: 767px)": {
      paddingLeft: 30,
      paddingRight: 30,
      marginBottom: 50
    }
  }),
  icon: css({
    width: 70,
    height: 70,
    color: "#ccc",
    margin: "0 0 20px 0"
  }),
  name: css({
    margin: "0 0 2px 0",
    "@media (max-width: 767px)": {
      marginBottom: 5
    }
  }),
  email: css({
    maxWidth: "100%",
    margin: "0 0 40px 0",
    overflowWrap: "break-word",
    wordWrap: "break-word",
    hyphens: "auto",
    "@media (max-width: 767px)": {
      marginBottom: 30
    }
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
