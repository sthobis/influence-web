import Router from "next/router";
import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "../../components/Layout";
import CONFIG from "../../config";
import { addNotification, setUser } from "../../store";
import { getInfluencerByUsername } from "../../utils/api";
import getUserGroup from "../../utils/getUserGroup";
import parseUserFromCookie from "../../utils/parseUserFromCookie";

class InfluencerEditPage extends Component {
  static async getInitialProps({ req, res, store, query }) {
    if (req) {
      // server-rendered
      const { user, accessToken } = parseUserFromCookie(req.headers.cookie);
      if (user) {
        // user is logged in save user session for client rehydration
        store.dispatch(setUser(user, accessToken));

        if (getUserGroup(accessToken) !== CONFIG.GROUP.INFLUENCER) {
          // non-influencer, trying to access influencer edit page
          // should not happen naturally
          return res.redirect("/");
        }

        // fetch influencer detail
        try {
          const { influencer } = await getInfluencerByUsername(query.username);
          return { influencer };
        } catch (err) {
          store.dispatch(
            addNotification(
              "Failed to load influencer detail, please try again."
            )
          );
          return { influencer: null };
        }
      } else {
        // user is not logged in
        // redirect to login page
        res.redirect("/login?redirect=/influencer/edit");
      }
    } else {
      // client-rendered
      const { user, accessToken } = store.getState();
      if (user) {
        // user is logged in

        if (getUserGroup(accessToken) !== CONFIG.GROUP.INFLUENCER) {
          // non-influencer, trying to access influencer edit page
          // should not happen naturally
          return Router.replace("/");
        }

        //fetch influencer detail
        try {
          const { influencer } = await getInfluencerByUsername(query.username);
          return { influencer };
        } catch (err) {
          store.dispatch(
            addNotification(
              "Failed to load influencer detail, please try again."
            )
          );
          return { influencer: null };
        }
      } else {
        // user is not logged in
        // redirect to login page
        Router.replace("/login?redirect=/influencer/edit");
      }
    }
  }

  render() {
    return (
      <Layout title="Edit my account">
        <p>InfluencerEditPage</p>
      </Layout>
    );
  }
}

export default connect(
  null,
  { addNotification }
)(InfluencerEditPage);
