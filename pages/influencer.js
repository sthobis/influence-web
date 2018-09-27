import Router from "next/router";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfluencerDetail from "../components/InfluencerDetail";
import Layout from "../components/Layout";
import { addNotification, setUser } from "../store";
import { getInfluencerByUsername } from "../utils/api";
import parseUserFromCookie from "../utils/parseUserFromCookie";

class Influencer extends Component {
  static async getInitialProps({ req, res, store, query }) {
    if (req) {
      // server-rendered
      const { user, accessToken } = parseUserFromCookie(req.headers.cookie);
      if (user) {
        // user is logged in, fetch influencer detail
        // and save user session for client rehydration
        store.dispatch(setUser(user, accessToken));
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
        res.redirect("/login");
      }
    } else {
      // client-rendered
      const { user } = store.getState();
      if (user) {
        // user is logged in, fetch influencer detail
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
        Router.replace("/login");
      }
    }
  }

  render() {
    const { influencer } = this.props;
    return (
      <Layout
        title={`${influencer.displayName} (${influencer.instagramHandle})`}
      >
        <InfluencerDetail influencer={influencer} />
      </Layout>
    );
  }
}

const dispatchToProps = dispatch => ({
  addNotification: bindActionCreators(addNotification, dispatch)
});

export default connect(
  null,
  dispatchToProps
)(Influencer);
