import Router from "next/router";
import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import InstagramLogin from "react-instagram-login";
import { connect } from "react-redux";
import Layout from "../components/Layout";
import { addNotification, setUser } from "../store";
import { authAdvertiser, authInfluencer } from "../utils/api";
import parseUserFromCookie from "../utils/parseUserFromCookie";

class Login extends Component {
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
        <div>
          <GoogleLogin
            clientId="753672082179-m23j4kahvq4qpp3e586rrmkiftdsau6d.apps.googleusercontent.com"
            buttonText="Login as Advertiser"
            onSuccess={this.loginAsAdvertiser}
            onFailure={err => this.handleError("Google", err)}
          />
        </div>
        <div>
          <InstagramLogin
            clientId="72137848bd42454189ac0417f88f6d70"
            buttonText="Login as Influencer"
            redirectUri={origin}
            onSuccess={this.loginAsInfluencer}
            onFailure={err => this.handleError("Instagram", err)}
          />
        </div>
      </Layout>
    );
  }
}

export default connect(
  null,
  { setUser, addNotification }
)(Login);
