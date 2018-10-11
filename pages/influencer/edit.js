import Router from "next/router";
import React, { Component } from "react";
import { connect } from "react-redux";
import InfluencerEdit from "../../components/InfluencerEdit";
import Layout from "../../components/Layout";
import CONFIG from "../../config";
import { addNotification, setUser } from "../../store";
import { getInfluencerByUsername, updateInfluencer } from "../../utils/api";
import getUserGroup from "../../utils/getUserGroup";
import parseUserFromCookie from "../../utils/parseUserFromCookie";
import PropTypes from "prop-types";

class InfluencerEditPage extends Component {
  static async getInitialProps({ req, res, store }) {
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
          const { influencer } = await getInfluencerByUsername(
            user.instagramHandle
          );
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
          const { influencer } = await getInfluencerByUsername(
            user.instagramHandle
          );
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

  state = {
    // set influencer props as state
    // so we can mutate it for editing purpose
    influencer: this.props.influencer
  };

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
    const { influencer } = this.state;
    return (
      <Layout title="Edit my account">
        <InfluencerEdit influencer={influencer} save={this.save} />
      </Layout>
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
