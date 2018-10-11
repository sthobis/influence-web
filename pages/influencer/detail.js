import Router from "next/router";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import InfluencerDetail from "../../components/InfluencerDetail";
import Layout from "../../components/Layout";
import { addNotification, setUser } from "../../store";
import { getInfluencerByUsername } from "../../utils/api";
import parseUserFromCookie from "../../utils/parseUserFromCookie";

class InfluencerDetailPage extends Component {
  static async getInitialProps({ req, res, store, query }) {
    if (req) {
      // server-rendered
      const { user, accessToken } = parseUserFromCookie(req.headers.cookie);
      if (user) {
        // user is logged in, fetch influencer detail
        // and save user session for client rehydration
        store.dispatch(setUser(user, accessToken));
        const isOwner = user.instagramHandle
          ? user.instagramHandle === query.username
          : false;
        try {
          const { influencer } = await getInfluencerByUsername(query.username);
          return { influencer, isOwner };
        } catch (err) {
          store.dispatch(
            addNotification(
              "Failed to load influencer detail, please try again."
            )
          );
          return { influencer: null, isOwner };
        }
      } else {
        // user is not logged in
        // redirect to login page
        res.redirect(`/login?redirect=/influencer/${query.username}`);
      }
    } else {
      // client-rendered
      const { user } = store.getState();
      if (user) {
        // user is logged in, fetch influencer detail
        const isOwner = user.instagramHandle
          ? user.instagramHandle === query.username
          : false;
        try {
          const { influencer } = await getInfluencerByUsername(query.username);
          return { influencer, isOwner };
        } catch (err) {
          store.dispatch(
            addNotification(
              "Failed to load influencer detail, please try again."
            )
          );
          return { influencer: null, isOwner };
        }
      } else {
        // user is not logged in
        // redirect to login page
        Router.replace(`/login?redirect=/influencer/${query.username}`);
      }
    }
  }

  render() {
    const { influencer, isOwner } = this.props;
    return (
      <Layout
        title={`${influencer.displayName} (${influencer.instagramHandle})`}
      >
        <InfluencerDetail influencer={influencer} isOwner={isOwner} />
      </Layout>
    );
  }
}

InfluencerDetailPage.propTypes = {
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
  }),
  isOwner: PropTypes.bool.isRequired
};

export default connect(
  null,
  { addNotification }
)(InfluencerDetailPage);
