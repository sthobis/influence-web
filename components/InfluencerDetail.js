import { css } from "emotion";
import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";
import formatFollower from "../utils/formatFollower";

const InfluencerDetail = ({ influencer }) => (
  <div className={styles.root}>
    <section className={styles.detail}>
      <img
        src={influencer.profilePicture}
        alt={influencer.displayName}
        className={styles.profilePicture}
      />
      <div>
        <h1 className={styles.displayName}>
          {influencer.displayName} (
          <a href={`https://www.instagram.com/${influencer.instagramHandle}`}>
            @{influencer.instagramHandle}
          </a>
          )
        </h1>
        <p className={styles.followersCount}>
          <strong>{formatFollower(influencer.followersCount)}</strong> followers
        </p>
        <p className={styles.biography}>{influencer.biography}</p>
        <div className={styles.tagsContainer}>
          {influencer.tags.map((tag, i) => (
            <Link key={i} href={`/influencers?tags=${tag}`}>
              <a className={styles.tags}>{tag}</a>
            </Link>
          ))}
        </div>
      </div>
    </section>
    <section>
      <h2>Endorse Info</h2>
      <p>endorse pricing post: {influencer.endorsePricing.post}</p>
      <p>endorse pricing story: {influencer.endorsePricing.story}</p>
      <p>contact phone: {influencer.contact.phone}</p>
      <p>contact whatsapp: {influencer.contact.whatsapp}</p>
      <p>contact line: {influencer.contact.line}</p>
      <p>contact instagram: {influencer.contact.instagram}</p>
      <p>contact email: {influencer.contact.email}</p>
    </section>
    <section>
      <h2>Recent Photos</h2>
      <ul className={styles.list}>
        {influencer.recentPhotos.map((photo, i) => (
          <li key={i} className={styles.listItem}>
            <a
              href={photo.url}
              style={{
                backgroundImage: `url('${photo.thumbnail}')`
              }}
              className={styles.photo}
            >
              <div className={styles.photoOverlay}>
                <span>{photo.likesCount.toLocaleString("id")} likes</span>
                <span>{photo.repliesCount.toLocaleString("id")} replies</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
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
  }),
  displayName: css({
    margin: "10px 0 10px 0",
    "& a": {
      color: "inherit"
    }
  }),
  followersCount: css({
    margin: "0 0 15px 0"
  }),
  biography: css({
    margin: "0 0 23px 0",
    lineHeight: "1.5",
    fontSize: 15
  }),
  tagsContainer: css({
    margin: "0 0 20px 0"
  }),
  tags: css({
    display: "inline-block",
    backgroundColor: "#111",
    margin: "0 10px 10px 0",
    padding: "5px 10px 7px 10px",
    fontWeight: 600,
    borderRadius: 5,
    fontSize: 13,
    textDecoration: "none",
    color: "#fff",
    "&:last-child": {
      marginRight: 0
    }
  }),
  list: css({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "stretch",
    margin: 0,
    padding: 0,
    listStyleType: "none"
  }),
  listItem: css({
    position: "relative",
    width: "calc((100% - 50px) / 3)",
    margin: "0 25px 25px 0",
    "&:before": {
      content: "''",
      display: "block",
      width: "100%",
      paddingTop: "100%"
    },
    "&:nth-child(3n+3)": {
      marginRight: 0
    },
    "&:nth-last-child(-n+3)": {
      marginBottom: 0
    }
  }),
  photo: css({
    position: "absolute",
    top: 0,
    left: 0,
    display: "block",
    width: "100%",
    height: "100%",
    backgroundColor: "#555",
    backgroundSize: "cover",
    backgroundPosition: "center",
    textDecoration: "none"
  }),
  photoOverlay: css({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "#fff",
    fontWeight: 600,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0,
    transition: ".3s",
    "& > *": {
      margin: "10px 20px"
    },
    "&:hover": {
      opacity: 1
    }
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
