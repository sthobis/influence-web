import Router from "next/router";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import InfluencerEdit from "../../components/InfluencerEdit";
import Layout from "../../components/Layout";
import Localize from "../../components/Localize";
import CONFIG from "../../config";
import { addNotification, setLanguage, setUser } from "../../store";
import { getInfluencerByUsername, updateInfluencer } from "../../utils/api";
import getUserGroup from "../../utils/getUserGroup";
import parseCookie from "../../utils/parseCookie";

class InfluencerEditPage extends Component {
  static async getInitialProps({ req, res, store, query }) {
    if (req) {
      // server-rendered
      const { user, accessToken, language } = parseCookie(req.headers.cookie);
      store.dispatch(setLanguage(language));
      if (user) {
        // user is logged in save user session for client rehydration
        store.dispatch(setUser(user, accessToken));
        if (getUserGroup(accessToken) !== CONFIG.GROUP.SUPER_ADMIN) {
          // non-admin, trying to access admin's influencer edit page
          return res.redirect("/admin");
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
        // redirect to admin login page
        res.redirect("/admin");
      }
    } else {
      // client-rendered
      const { user, accessToken } = store.getState();
      if (user) {
        // user is logged in
        if (getUserGroup(accessToken) !== CONFIG.GROUP.SUPER_ADMIN) {
          // non-admin, trying to access admin's influencer edit page
          return Router.replace("/admin");
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
        // redirect to admin login page
        Router.replace("/admin");
      }
    }
  }

  save = async influencer => {
    const { addNotification } = this.props;
    try {
      await updateInfluencer({ influencer });
      addNotification("Your profile has been updated.");
    } catch (err) {
      addNotification("Failed to update your profile, please try again.");
    }
  };

  render() {
    const { influencer } = this.props;
    return (
      <Localize selector="pages.influencerEdit">
        {localized => (
          <Layout title={localized[0]}>
            <InfluencerEdit influencer={influencer} save={this.save} />
          </Layout>
        )}
      </Localize>
    );
  }
}

InfluencerEditPage.propTypes = {
  influencer: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    instagramHandle: PropTypes.string.isRequired,
    profilePicture: PropTypes.string.isRequired,
    followersCount: PropTypes.number.isRequired,
    endorsePricing: PropTypes.shape({
      post: PropTypes.number.isRequired,
      story: PropTypes.number.isRequired
    }).isRequired,
    contact: PropTypes.shape({
      phone: PropTypes.string.isRequired,
      whatsapp: PropTypes.string.isRequired,
      line: PropTypes.string.isRequired,
      instagram: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired
    }).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    biography: PropTypes.string.isRequired,
    isVerified: PropTypes.bool.isRequired,
    isPrivate: PropTypes.bool.isRequired,
    recentPhotos: PropTypes.arrayOf(
      PropTypes.shape({
        thumbnail: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        likesCount: PropTypes.number.isRequired,
        repliesCount: PropTypes.number.isRequired
      })
    )
  })
};

export default connect(
  null,
  { addNotification }
)(InfluencerEditPage);
