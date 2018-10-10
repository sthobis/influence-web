import { css } from "emotion";
import PropTypes from "prop-types";
import React from "react";
import GoogleLogin from "react-google-login";
import InstagramLogin from "react-instagram-login";

const Login = ({
  origin,
  loginAsAdvertiser,
  loginAsInfluencer,
  handleError
}) => (
  <div className={styles.root}>
    <section className={styles.section}>
      <p>
        I am a person/agency looking for an influencer to promote/endorse my
        brand/product
      </p>
      <GoogleLogin
        clientId="753672082179-m23j4kahvq4qpp3e586rrmkiftdsau6d.apps.googleusercontent.com"
        buttonText="Login as Advertiser"
        onSuccess={loginAsAdvertiser}
        onFailure={err => handleError("Google", err)}
        className={styles.loginButton}
      />
    </section>
    <section className={styles.section}>
      <p>
        I am an influencer looking for opportunity to promote/endorse someone's
        brand/product
      </p>
      <InstagramLogin
        clientId="f2ba3adae3564817b3421225dcc1f1bf"
        buttonText="Login as Influencer"
        redirectUri={origin}
        onSuccess={loginAsInfluencer}
        onFailure={err => handleError("Instagram", err)}
        cssClass={styles.loginButton}
      />
    </section>
  </div>
);

const styles = {
  root: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }),
  section: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  }),
  illustration: css({
    height: 300
  }),
  loginButton: css({
    display: "block",
    padding: "10px 15px",
    background: "turquoise",
    border: "none",
    borderRadius: 5,
    color: "#fff",
    fontWeight: 700,
    fontSize: 16,
    cursor: "pointer"
  })
};

Login.propTypes = {
  origin: PropTypes.string.isRequired,
  loginAsAdvertiser: PropTypes.func.isRequired,
  loginAsInfluencer: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired
};

export default Login;
