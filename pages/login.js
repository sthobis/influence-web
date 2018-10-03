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
        return { query };
      }
    } else {
      // client-rendered
      const { user } = store.getState();
      if (user) {
        // user is logged in, redirect to home page
        Router.replace("/");
      } else {
        return { query };
      }
    }
  }

  login = async data => {
    const { setUser, query } = this.props;

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

  instaLogin = async data => {
    const { setUser, query } = this.props;

    const token = data;
    console.log(data);
    try {
      const { influencer, accessToken } = await authInfluencer({ token });
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

  render() {
    return (
      <Layout>
        <div>
          <GoogleLogin
            clientId="753672082179-m23j4kahvq4qpp3e586rrmkiftdsau6d.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={this.login}
            onFailure={console.log}
          />
        </div>
        <div>
          <InstagramLogin
            clientId="72137848bd42454189ac0417f88f6d70"
            buttonText="Login with Instagram"
            onSuccess={this.instaLogin}
            onFailure={console.log}
          />
        </div>
      </Layout>
    );
  }
}

export default connect(
  null,
  { setUser }
)(Login);
