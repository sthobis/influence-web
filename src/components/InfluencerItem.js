import { css } from "emotion";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const styles = {
  root: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    textAlign: "center"
  }),
  info: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 30
  }),
  link: css({
    color: "#0a3d62",
    textDecoration: "none",
    display: "inline-block"
  }),
  thumbnailContainer: css({
    width: "100%",
    maxWidth: 120,
    margin: "20px 0 0 0"
  }),
  thumbnail: css({
    maxWidth: "100%",
    borderRadius: "50%",
    overflow: "hidden"
  }),
  nameContainer: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px 0"
  }),
  displayName: css({
    textTransform: "capitalize",
    margin: "0 0 2px 0",
    fontWeight: 400,
    fontSize: 20
  }),
  instagramHandle: css({
    margin: 0,
    color: "#888",
    fontWeight: 400,
    fontSize: 14
  }),
  detail: css({
    display: "block",
    width: "100%",
    backgroundColor: "turquoise",
    padding: 10,
    textAlign: "center",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "0 0 5px 5px"
  })
};

const followerFormatter = number => {
  const hundredMillion = 100000000;
  const million = 1000000;
  const thousand = 1000;
  if (number >= hundredMillion) {
    return `${(number / million).toFixed(0)}m`.replace(".0", "");
  }
  if (number >= million) {
    return `${(number / million).toFixed(1)}m`.replace(".0", "");
  } else if (number >= thousand) {
    return `${(number / thousand).toFixed(1)}k`.replace(".0", "");
  } else {
    return number;
  }
};

const InfluencerItem = ({ influencer, viewType }) => (
  <div className={styles.root}>
    <div className={styles.info}>
      <div className={styles.thumbnailContainer}>
        <img
          src={influencer.profilePicture}
          alt={influencer.displayName}
          className={styles.thumbnail}
        />
      </div>
      <div className={styles.nameContainer}>
        <h2 className={styles.displayName}>
          {influencer.displayName
            .trim()
            .toLowerCase()
            .replace(/[^a-z ]/gi, "")}
        </h2>
        <a
          href={`https://instagram.com/${influencer.instagramHandle}`}
          className={styles.link}
        >
          <p className={styles.instagramHandle}>
            @{influencer.instagramHandle}
          </p>
        </a>
      </div>
      <div>
        <strong>{followerFormatter(influencer.followersCount)}</strong> pengikut
      </div>
      <div>
        {influencer.tags.map(tag => (
          <span>tag</span>
        ))}
      </div>
    </div>
    <Link
      to={`/influencer/${influencer.instagramHandle}`}
      key={influencer._id}
      className={styles.detail}
    >
      Detail
    </Link>
  </div>
);

InfluencerItem.propTypes = {
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
  }).isRequired,
  viewType: PropTypes.oneOf(["card", "list"]).isRequired
};

export default InfluencerItem;
