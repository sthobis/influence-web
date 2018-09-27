import { css } from "emotion";
import PropTypes from "prop-types";
import React from "react";

const InfluencerDetail = ({ influencer }) => (
  <div className={styles.root}>
    <section className={styles.detail}>
      <img
        src={influencer.profilePicture}
        alt={influencer.displayName}
        className={styles.profilePicture}
      />
      <div>
        <p>{influencer.displayName}</p>
        <p>{influencer.instagramHandle}</p>
        <p>biography: {influencer.biography}</p>
        <p>followers: {influencer.followersCount}</p>
        <p>
          tags:{" "}
          {influencer.tags.map((tag, i) => (
            <span key={i}>{tag}</span>
          ))}
        </p>
      </div>
    </section>
    <section>
      <p>endorse pricing post: {influencer.endorsePricing.post}</p>
      <p>endorse pricing story: {influencer.endorsePricing.story}</p>
      <p>contact phone: {influencer.contact.phone}</p>
      <p>contact whatsapp: {influencer.contact.whatsapp}</p>
      <p>contact line: {influencer.contact.line}</p>
      <p>contact instagram: {influencer.contact.instagram}</p>
      <p>contact email: {influencer.contact.email}</p>
    </section>
    <section>
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
    </section>
  </div>
);

const styles = {
  root: css({
    display: "block",
    padding: 50,
    backgroundColor: "#fff",
    borderRadius: 5,
    boxShadow: "0 0 30px rgba(35, 0, 95, 0.05)"
  }),
  detail: css({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  }),
  profilePicture: css({
    width: "100%",
    maxWidth: "200px",
    borderRadius: "50%",
    margin: "0 50px 0 0 "
  })
};

InfluencerDetail.propTypes = {
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
  }).isRequired
};

export default InfluencerDetail;
