import Router from "next/router";
import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import { addNotification, setUser } from "../store";
import { authAdvertiser } from "../utils/api";
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
        res.redirect("/login");
      }
    } else {
      // client-rendered
      const { user } = store.getState();
      if (user) {
        // user is logged in, redirect to home page
        Router.replace("/");
      }
    }
  }

  login = async data => {
    const token = data.tokenId;
    try {
      const { advertiser, accessToken } = await authAdvertiser({ token });
      setUser(advertiser, accessToken);
      Router.push("/");
    } catch (err) {
      addNotification("Login failed, please try again.");
    }
  };

  render() {
    return (
      <GoogleLogin
        clientId="753672082179-m23j4kahvq4qpp3e586rrmkiftdsau6d.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={this.login}
        onFailure={console.log}
      />
    );
  }
}

export default Login;
