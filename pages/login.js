import Router from "next/router";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "../components/Layout";
import Login from "../components/Login";
import { addNotification, setUser } from "../store";
import { authAdvertiser, authInfluencer } from "../utils/api";
import parseUserFromCookie from "../utils/parseUserFromCookie";

class LoginPage extends Component {
  static async getInitialProps({ req, res, store, query }) {
    if (req) {
      // server-rendered
      const { user, accessToken } = parseUserFromCookie(req.headers.cookie);
      if (user) {
        // user is logged in save user session for client rehydration
        // and redirect to home page
        store.dispatch(setUser(user, accessToken));
        res.redirect("/");
      } else {
        return { query, origin: req.headers.referer.split("?")[0] };
      }
    } else {
      // client-rendered
      const { user } = store.getState();
      if (user) {
        // user is logged in, redirect to home page
        Router.replace("/");
      } else {
        return { query, origin: window.location.origin };
      }
    }
  }

  loginAsAdvertiser = async data => {
    const { setUser, query, addNotification } = this.props;

    const token = data.tokenId;
    try {
      const { advertiser, accessToken } = await authAdvertiser({ token });
      setUser(advertiser, accessToken);
      if (query.redirect) {
        Router.push(query.redirect);
      } else {
        Router.push("/");
      }
    } catch (err) {
      addNotification("Login failed, please try again.");
    }
  };

  loginAsInfluencer = async code => {
    const { setUser, query, origin, addNotification } = this.props;

    try {
      // we're using current origin (/login) as redirection_uri parameter
      // for getting instagram app code
      // send it to authentication API for instagram access token request
      const { influencer, accessToken } = await authInfluencer({
        code,
        redirectUri: origin
      });
      setUser(influencer, accessToken);
      if (query.redirect) {
        Router.push(query.redirect);
      } else {
        Router.push("/");
      }
    } catch (err) {
      addNotification("Login failed, please try again.");
    }
  };

  handleError = (service, error) => {
    const { addNotification } = this.props;
    addNotification(`${service} login failed, please try again.`);
    console.log(error);
  };

  render() {
    const { origin } = this.props;
    return (
      <Layout>
        <Login
          origin={origin}
          loginAsAdvertiser={this.loginAsAdvertiser}
          loginAsInfluencer={this.loginAsInfluencer}
          handleError={this.handleError}
        />
      </Layout>
    );
  }
}

LoginPage.propTypes = {
  query: PropTypes.object.isRequired,
  origin: PropTypes.string.isRequired,
  addNotification: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { setUser, addNotification }
)(LoginPage);
