import { css, cx, keyframes } from "emotion";
import PropTypes from "prop-types";
import React from "react";
import GoogleLogin from "react-google-login";
import { FaGoogle, FaInstagram, FaSpinner } from "react-icons/fa";
import InstagramLogin from "react-instagram-login";
import CONFIG from "../config";
import AdvertiserIllustration from "./AdvertiserIllustration";
import InfluencerIllustration from "./InfluencerIllustration";

const Login = ({
  loggingInAs,
  fetchStatus,
  loginAsAdvertiser,
  loginAsInfluencer,
  handleError
}) => (
  <div className={styles.root}>
    <section
      className={cx(
        styles.section,
        {
          [styles.minimize]: loggingInAs === CONFIG.GROUP.INFLUENCER
        },
        {
          [styles.maximize]: loggingInAs === CONFIG.GROUP.ADVERTISER
        }
      )}
    >
      <div className={styles.illustration}>
        <AdvertiserIllustration />
      </div>
      <p className={styles.description}>
        I am an <strong>Advertiser</strong> looking for influencer to
        <br />
        promote/endorse my brand.
      </p>
      <GoogleLogin
        clientId="753672082179-m23j4kahvq4qpp3e586rrmkiftdsau6d.apps.googleusercontent.com"
        onSuccess={loginAsAdvertiser}
        onFailure={err => handleError("Google", err)}
        className={cx(styles.button, styles.google, {
          [styles.loading]: fetchStatus === CONFIG.FETCH_STATUS.FETCHING
        })}
        disabled={fetchStatus === CONFIG.FETCH_STATUS.FETCHING}
      >
        {fetchStatus === CONFIG.FETCH_STATUS.FETCHING ? (
          <FaSpinner />
        ) : (
          <>
            <FaGoogle /> Login with Google
          </>
        )}
      </GoogleLogin>
    </section>
    <section
      className={cx(
        styles.section,
        {
          [styles.minimize]: loggingInAs === CONFIG.GROUP.ADVERTISER
        },
        {
          [styles.maximize]: loggingInAs === CONFIG.GROUP.INFLUENCER
        }
      )}
    >
      <div className={styles.illustration}>
        <InfluencerIllustration />
      </div>
      <p className={styles.description}>
        I am an <strong>Influencer</strong> looking for opportunity to
        <br />
        promote/endorse someone's brand.
      </p>
      <InstagramLogin
        clientId="f2ba3adae3564817b3421225dcc1f1bf"
        redirectUri={`${CONFIG.BASE_URL[process.env.NODE_ENV]}/login`}
        onSuccess={loginAsInfluencer}
        onFailure={err => handleError("Instagram", err)}
        cssClass={cx(styles.button, styles.instagram, {
          [styles.loading]: fetchStatus === CONFIG.FETCH_STATUS.FETCHING
        })}
        disabled={fetchStatus === CONFIG.FETCH_STATUS.FETCHING}
      >
        {fetchStatus === CONFIG.FETCH_STATUS.FETCHING ? (
          <FaSpinner />
        ) : (
          <>
            <FaInstagram /> Login with Instagram
          </>
        )}
      </InstagramLogin>
    </section>
  </div>
);

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(359deg);
  }
`;

const styles = {
  root: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0 0 75px 0"
  }),
  section: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    width: "calc((100% - 50px) / 2)",
    overflow: "hidden",
    transition: ".3s"
  }),
  minimize: css({
    width: 0
  }),
  maximize: css({
    width: "100%"
  }),
  illustration: css({
    width: "100%",
    maxWidth: 400,
    position: "relative",
    "&::before": {
      content: "''",
      display: "block",
      paddingBottom: "100%"
    },
    "& > *": {
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%"
    }
  }),
  description: css({
    margin: "40px 0 30px 0",
    fontSize: 18
  }),
  button: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 30px",
    width: "100%",
    maxWidth: 280,
    background: "turquoise",
    border: "none",
    borderRadius: 5,
    color: "#fff",
    fontWeight: 700,
    fontSize: 16,
    cursor: "pointer",
    "& svg": {
      margin: "0 10px 0 0"
    }
  }),
  google: css({
    background: "#3484ff"
  }),
  instagram: css({
    background: "#e42886"
  }),
  loading: css({
    "& svg": {
      margin: 0,
      animation: `${spin} 1s linear infinite`
    }
  })
};

Login.propTypes = {
  loggingInAs: PropTypes.oneOf([
    "",
    CONFIG.GROUP.ADVERTISER,
    CONFIG.GROUP.INFLUENCER
  ]).isRequired,
  fetchStatus: PropTypes.oneOf([
    CONFIG.FETCH_STATUS.FETCHING,
    CONFIG.FETCH_STATUS.FINISHED
  ]).isRequired,
  loginAsAdvertiser: PropTypes.func.isRequired,
  loginAsInfluencer: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired
};

export default Login;