import produce from "immer";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Page from "../components/Page";
import CONFIG from "../config";
import { addNotification } from "../store";
import { getInfluencerByUsername } from "../utils/api";

class InfluencerDetail extends Component {
  state = {
    influencer: null,
    fetchStatus: CONFIG.FETCH_STATUS.FETCHING
  };

  async componentDidMount() {
    const {
      addNotification,
      match: {
        params: { username }
      }
    } = this.props;

    try {
      const { influencer } = await getInfluencerByUsername(username);
      this.setState(
        produce(draft => {
          draft.influencer = influencer;
          draft.fetchStatus = CONFIG.FETCH_STATUS.FINISHED;
        })
      );
    } catch (err) {
      addNotification("Failed to load influencer detail. Please try again.");
      this.setState(
        produce(draft => {
          draft.fetchStatus = CONFIG.FETCH_STATUS.FINISHED;
        })
      );
    }
  }

  render() {
    const { influencer, fetchStatus } = this.state;
    return (
      <Page
        className={
          influencer ? influencer.instagramHandle : "Influencer Detail"
        }
        title="Influence - Find the perfect influencer for your business"
      >
        {fetchStatus === CONFIG.FETCH_STATUS.FINISHED ? (
          <div>
            <p>name: {influencer.displayName}</p>
            <p>username: {influencer.instagramHandle}</p>
            <p>biography: {influencer.biography}</p>
            <p>
              profpic:{" "}
              <img
                src={influencer.profilePicture}
                alt={influencer.displayName}
              />
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
        ) : (
          "Loading.."
        )}
      </Page>
    );
  }
}

const dispatchToProps = dispatch => ({
  addNotification: bindActionCreators(addNotification, dispatch)
});

export default connect(
  null,
  dispatchToProps
)(InfluencerDetail);
