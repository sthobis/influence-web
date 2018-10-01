import Router from "next/router";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Layout from "../../components/Layout";
import CONFIG from "../../config";
import { addNotification, setUser } from "../../store";
import { getAdvertiserById } from "../../utils/api";
import getUserGroup from "../../utils/getUserGroup";
import parseUserFromCookie from "../../utils/parseUserFromCookie";

class AdvertiserEditPage extends Component {
  static async getInitialProps({ req, res, store, query }) {
    if (req) {
      // server-rendered
      const { user, accessToken } = parseUserFromCookie(req.headers.cookie);
      if (user) {
        // user is logged in save user session for client rehydration
        store.dispatch(setUser(user, accessToken));

        if (getUserGroup(accessToken) !== CONFIG.GROUP.ADVERTISER) {
          // non-advertiser, trying to access advertiser edit page
          // should not happen naturally
          return res.redirect("/");
        }

        // fetch advertiser detail
        try {
          const { advertiser } = await getAdvertiserById(user._id);
          return { advertiser };
        } catch (err) {
          store.dispatch(
            addNotification(
              "Failed to load advertiser detail, please try again."
            )
          );
          return { advertiser: null };
        }
      } else {
        // user is not logged in
        // redirect to login page
        res.redirect("/login?redirect=/advertiser/edit");
      }
    } else {
      // client-rendered
      const { user, accessToken } = store.getState();
      if (user) {
        // user is logged in

        if (getUserGroup(accessToken) !== CONFIG.GROUP.ADVERTISER) {
          // non-advertiser, trying to access advertiser edit page
          // should not happen naturally
          return Router.replace("/");
        }

        //fetch advertiser detail
        try {
          const { advertiser } = await getAdvertiserById(user._id);
          return { advertiser };
        } catch (err) {
          store.dispatch(
            addNotification(
              "Failed to load advertiser detail, please try again."
            )
          );
          return { advertiser: null };
        }
      } else {
        // user is not logged in
        // redirect to login page
        Router.replace("/login?redirect=/advertiser/edit");
      }
    }
  }

  render() {
    const { advertiser } = this.props;
    return (
      <Layout title="Edit my account">
        <p>Edit Advertiser {advertiser.email}</p>
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
)(AdvertiserEditPage);
