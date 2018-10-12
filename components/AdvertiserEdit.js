import { css } from "emotion";
import PropTypes from "prop-types";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import PremiumNotice from "./PremiumNotice";

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
