import Router from "next/router";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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
        className={
          influencer ? influencer.instagramHandle : "Influencer Detail"
        }
        title="Influence - Find the perfect influencer for your business"
      >
        <div>
          <p>name: {influencer.displayName}</p>
          <p>username: {influencer.instagramHandle}</p>
          <p>biography: {influencer.biography}</p>
          <p>
            profpic:{" "}
            <img src={influencer.profilePicture} alt={influencer.displayName} />
          </p>
          <p>followers: {influencer.followersCount}</p>
          <p>endorse pricing post: {influencer.endorsePricing.post}</p>
          <p>endorse pricing story: {influencer.endorsePricing.story}</p>
          <p>contact phone: {influencer.contact.phone}</p>
          <p>contact whatsapp: {influencer.contact.whatsapp}</p>
          <p>contact line: {influencer.contact.line}</p>
          <p>contact instagram: {influencer.contact.instagram}</p>
          <p>contact email: {influencer.contact.email}</p>
          <p>
            tags:{" "}
            {influencer.tags.map((tag, i) => (
              <span key={i}>{tag}</span>
            ))}
          </p>
          <div>
            recent photos:
            {influencer.recentPhotos.map((photo, i) => (
              <div key={i}>
                <a href={photo.url}>
                  <img src={photo.thumbnail} alt={influencer.displayName} />
                </a>
                <p>likes : {photo.likesCount}</p>
                <p>replies : {photo.repliesCount}</p>
                <br />
              </div>
            ))}
          </div>
          <p>is verified: {influencer.isVerified.toString()}</p>
          <p>is private: {influencer.isPrivate.toString()}</p>
        </div>
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
