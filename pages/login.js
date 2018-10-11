import Router from "next/router";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "../components/Layout";
import Login from "../components/Login";
import CONFIG from "../config";
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
        return { query };
      }
    } else {
      // client-rendered
      const { user } = store.getState();
      if (user) {
        // user is logged in, redirect to home page
        Router.replace("/");
      } else {
        return {
          query
        };
      }
    }
  }

  state = {
    loggingInAs: "",
    fetchStatus: CONFIG.FETCH_STATUS.FINISHED
  };

  loginAsAdvertiser = async data => {
    const { setUser, query, addNotification } = this.props;

    this.setState({
      loggingInAs: CONFIG.GROUP.ADVERTISER,
      fetchStatus: CONFIG.FETCH_STATUS.FETCHING
    });
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
      this.setState({
        loggingInAs: "",
        fetchStatus: CONFIG.FETCH_STATUS.FINISHED
      });
    }
  };

  loginAsInfluencer = async code => {
    const { setUser, query, addNotification } = this.props;

    this.setState({
      loggingInAs: CONFIG.GROUP.INFLUENCER,
      fetchStatus: CONFIG.FETCH_STATUS.FETCHING
    });
    try {
      // we're using current origin (/login) as redirection_uri parameter
      // for getting instagram app code
      // send it to authentication API for instagram access token request
      const { influencer, accessToken } = await authInfluencer({
        code,
        redirectUri: `${CONFIG.BASE_URL[process.env.NODE_ENV]}/login`
      });
      setUser(influencer, accessToken);
      if (query.redirect) {
        Router.push(query.redirect);
      } else {
        Router.push("/");
      }
    } catch (err) {
      addNotification("Login failed, please try again.");
      this.setState({
        loggingInAs: "",
        fetchStatus: CONFIG.FETCH_STATUS.FINISHED
      });
    }
  };

  handleError = (service, error) => {
    const { addNotification } = this.props;
    addNotification(`${service} login failed, please try again.`);
    console.log(error);
  };

  render() {
    const { loggingInAs, fetchStatus } = this.state;
    return (
      <Layout>
        <Login
          loggingInAs={loggingInAs}
          fetchStatus={fetchStatus}
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
  addNotification: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { setUser, addNotification }
)(LoginPage);
