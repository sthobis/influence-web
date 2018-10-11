import { css } from "emotion";
import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";
import formatFollower from "../utils/formatFollower";

const InfluencerItem = ({ influencer, viewType }) => (
  <div className={styles.root}>
    <div className={styles.info}>
      <img
        src={influencer.profilePicture}
        alt={influencer.displayName}
        className={styles.thumbnail}
      />
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
        <strong>{formatFollower(influencer.followersCount)}</strong> followers
      </div>
      <div className={styles.tagsContainer}>
        {influencer.tags.map((tag, i) => (
          <Link key={i} href={`/influencer?tags=${tag}`}>
            <a className={styles.tags}>{tag}</a>
          </Link>
        ))}
      </div>
    </div>
    <Link
      href={`/influencer/detail?username=${influencer.instagramHandle}`}
      as={`/influencer/detail/${influencer.instagramHandle}`}
    >
      <a className={styles.detail}>Detail</a>
    </Link>
  </div>
);

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
  thumbnail: css({
    width: "100%",
    maxWidth: 120,
    margin: "20px 0 0 0",
    borderRadius: "50%",
    overflow: "hidden"
  }),
  nameContainer: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px 0 10px 0"
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
  tagsContainer: css({
    margin: "20px 0 0 0"
  }),
  tags: css({
    display: "inline-block",
    backgroundColor: "rgba(24, 26, 40, 0.1)",
    margin: "0 10px 10px 0",
    padding: "7px 10px",
    fontWeight: 700,
    borderRadius: 5,
    fontSize: 13,
    textDecoration: "none",
    color: "rgb(24, 26, 40)",
    "&:last-child": {
      marginRight: 0
    }
  }),
  detail: css({
    display: "block",
    width: "100%",
    backgroundColor: "#2e3040",
    padding: 10,
    textAlign: "center",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "0 0 5px 5px",
    fontWeight: 600,
    fontSize: 14,
    textTransform: "uppercase"
  })
};

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
