import { css } from "emotion";
import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import formatFollower from "../utils/formatFollower";
import Localize from "./Localize";

const InfluencerItem = ({ influencer, viewType }) => (
  <Localize selector="components.influencerItem">
    {localized => (
      <div className={styles.root}>
        <Link
          href={`/influencer/detail?username=${influencer.instagramHandle}`}
          as={`/influencer/detail/${influencer.instagramHandle}`}
        >
          <a className={styles.info}>
            <img
              src={influencer.profilePicture}
              alt={influencer.displayName}
              className={styles.thumbnail}
            />
            <div className={styles.nameContainer}>
              <h2 className={styles.displayName}>
                {influencer.displayName.trim().toLowerCase()}
              </h2>
              <p className={styles.instagramHandle}>
                @{influencer.instagramHandle}
                {influencer.isVerified && (
                  <span title={localized[1]} className={styles.verified}>
                    <FaCheckCircle style={{ color: "#00a8ff" }} />
                  </span>
                )}
              </p>
            </div>
            <div className={styles.followersCount}>
              <strong>{formatFollower(influencer.followersCount)}</strong>{" "}
              {localized[0]}
            </div>
          </a>
        </Link>
        <div className={styles.tagsContainer}>
          {influencer.tags.map((tag, i) => (
            <Link key={i} href={`/influencer?tags=${tag}`}>
              <a className={styles.tags}>{tag}</a>
            </Link>
          ))}
        </div>
      </div>
    )}
  </Localize>
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
    padding: "30px 30px 20px 30px",
    textDecoration: "none",
    color: "inherit"
  }),
  thumbnail: css({
    width: "100%",
    maxWidth: 150,
    margin: 0,
    borderRadius: "50%",
    overflow: "hidden"
  }),
  nameContainer: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px 0 5px 0"
  }),
  displayName: css({
    textTransform: "capitalize",
    margin: "0 0 2px 0",
    fontWeight: 700,
    fontSize: 18,
    fontFamily: "Nunito, sans-serif"
  }),
  instagramHandle: css({
    display: "flex",
    alignItems: "center",
    margin: 0,
    color: "#888",
    fontWeight: 600,
    fontSize: 14,
    fontFamily: "Nunito, sans-serif"
  }),
  verified: css({
    fontSize: 13,
    margin: "5px 0 0 6px"
  }),
  followersCount: css({
    fontWeight: 600,
    fontSize: 14,
    "& strong": {
      fontSize: 16
    }
  }),
  tagsContainer: css({
    display: "block",
    width: "100%",
    backgroundColor: "#2e3040",
    padding: "10px 10px",
    borderRadius: "0 0 5px 5px"
  }),
  tags: css({
    display: "inline-block",
    margin: "5px",
    padding: "4px 6px",
    borderRadius: 3,
    border: "1px solid #fff",
    fontSize: 12,
    textDecoration: "none",
    color: "#fff"
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
