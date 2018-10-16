import Router from "next/router";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import AdvertiserEdit from "../../components/AdvertiserEdit";
import Layout from "../../components/Layout";
import Localize from "../../components/Localize";
import CONFIG from "../../config";
import { addNotification, setLanguage, setUser } from "../../store";
import { getAdvertiserById } from "../../utils/api";
import getUserGroup from "../../utils/getUserGroup";
import parseCookie from "../../utils/parseCookie";

class AdvertiserEditPage extends Component {
  static async getInitialProps({ req, res, store }) {
    if (req) {
      // server-rendered
      const { user, accessToken, language } = parseCookie(req.headers.cookie);
      store.dispatch(setLanguage(language));
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
        res.redirect("/login?redirect=/agency/edit");
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
        Router.replace("/login?redirect=/agency/edit");
      }
    }
  }

  render() {
    const { advertiser } = this.props;
    return (
      <Localize selector="pages.advertiserEdit">
        {localized => (
          <Layout title={localized[0]}>
            <AdvertiserEdit advertiser={advertiser} />
          </Layout>
        )}
      </Localize>
    );
  }
}

AdvertiserEditPage.propTypes = {
  advertiser: PropTypes.shape({
    googleId: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    premiumExpiredAt: PropTypes.string
  })
};

export default connect(
  null,
  { addNotification }
)(AdvertiserEditPage);
