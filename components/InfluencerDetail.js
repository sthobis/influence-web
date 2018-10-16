import { css, cx } from "emotion";
import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";
import {
  FaCheckCircle,
  FaComment,
  FaEnvelope,
  FaHeart,
  FaInstagram,
  FaLine,
  FaMoneyCheckAlt,
  FaPhone,
  FaUserCog,
  FaWhatsapp
} from "react-icons/fa";
import formatFollower from "../utils/formatFollower";
import Localize from "./Localize";

const formatDate = dateStr => {
  const date = new Date(dateStr);
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};

const contactStyles = {
  email: {
    background: "#5352ed",
    icon: <FaEnvelope />
  },
  instagram: {
    background: "linear-gradient(-315deg,#ffd521,#f30005,#b900b4)",
    icon: <FaInstagram />
  },
  whatsapp: {
    background: "#24cc63",
    icon: <FaWhatsapp />
  },
  line: {
    background: "#00b300",
    icon: <FaLine />
  },
  phone: {
    background: "#4b6584",
    icon: <FaPhone />
  }
};

const InfluencerDetail = ({ influencer, isOwner }) => (
  <Localize selector="components.influencerDetail">
    {localized => (
      <div className={styles.root}>
        <section className={styles.detail}>
          {isOwner && (
            <Link href="/influencer/edit">
              <a className={styles.editButton}>
                <FaUserCog /> {localized[0]}
              </a>
            </Link>
          )}
          <img
            src={influencer.profilePicture}
            alt={influencer.displayName}
            className={styles.profilePicture}
          />
          <div>
            <h1 className={styles.displayName}>
              {influencer.displayName}{" "}
              <span>
                (
                <a
                  href={`https://www.instagram.com/${
                    influencer.instagramHandle
                  }`}
                >
                  @{influencer.instagramHandle}
                </a>
                )
              </span>
              {influencer.isVerified && (
                <span title={localized[1]}>
                  <FaCheckCircle style={{ color: "#00a8ff" }} />
                </span>
              )}
            </h1>
            <p className={styles.followersCount}>
              <strong>{formatFollower(influencer.followersCount)}</strong>{" "}
              {localized[2]}
            </p>
            <p className={styles.biography}>{influencer.biography}</p>
            <div className={styles.tagsContainer}>
              {influencer.tags.map((tag, i) => (
                <Link key={i} href={`/influencer?tags=${tag}`}>
                  <a className={styles.tags}>{tag}</a>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section>
          <h2 className={styles.sectionTitle}>{localized[3]}</h2>
          <div className={styles.endorse}>
            <div>
              <div className={styles.endorseDetail}>
                <span className={styles.endorseDetailTitle}>
                  <FaMoneyCheckAlt /> {localized[4]}
                </span>
                <span className={styles.endorseDetailValue}>
                  <span>{localized[5]}</span>
                  <strong>
                    {influencer.endorsePricing.post.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR"
                    })}
                  </strong>
                </span>
              </div>
              <div className={styles.endorseDetail}>
                <span className={styles.endorseDetailTitle}>
                  <FaMoneyCheckAlt /> {localized[6]}
                </span>
                <span className={styles.endorseDetailValue}>
                  <span>{localized[5]}</span>
                  <strong>
                    {influencer.endorsePricing.story.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR"
                    })}
                  </strong>
                </span>
              </div>
            </div>
            <ul className={styles.contactList}>
              {Object.keys(contactStyles).map(key => (
                <li className={styles.contactDetail} key={key}>
                  <span
                    style={{ background: contactStyles[key].background }}
                    className={cx(styles.icon, styles.smallIcon)}
                    title={key}
                  >
                    {contactStyles[key].icon}
                  </span>
                  <span className={styles.contactText}>
                    {influencer.contact[key] || "---"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section>
          <h2 className={styles.sectionTitle}>{localized[7]}</h2>
          <ul className={styles.list}>
            {influencer.recentPhotos.map((photo, i) => (
              <li key={i} className={styles.listItem}>
                <a href={photo.url} className={styles.photo}>
                  <div
                    className={styles.photoImage}
                    style={{
                      backgroundImage: `url('${photo.thumbnail}')`
                    }}
                  />
                  <div className={styles.photoOverlay}>
                    <span className={styles.overlayText}>
                      <FaHeart /> {photo.likesCount.toLocaleString("id")}
                    </span>
                    <span className={styles.overlayText}>
                      <FaComment /> {photo.repliesCount.toLocaleString("id")}
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </section>
        <p className={styles.timestamp}>
          {localized[8]} {formatDate(influencer.updatedAt)}
        </p>
      </div>
    )}
  </Localize>
);

const styles = {
  root: css({
    display: "block",
    padding: 50,
    backgroundColor: "#fff",
    borderRadius: 5,
    boxShadow: "0 0 30px rgba(35, 0, 95, 0.05)",
    margin: "0 0 75px 0",
    "@media (max-width: 767px)": {
      paddingLeft: 30,
      paddingRight: 30
    }
  }),
  detail: css({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    position: "relative",
    "@media (max-width: 767px)": {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center"
    }
  }),
  editButton: css({
    position: "absolute",
    top: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    borderRadius: 3,
    backgroundColor: "#2e3040",
    padding: "10px 15px",
    color: "#fff",
    fontWeight: 600,
    "& svg": {
      marginRight: 10
    },
    "@media (max-width: 767px)": {
      top: -60,
      right: "auto",
      left: "auto"
    }
  }),
  profilePicture: css({
    width: "100%",
    maxWidth: "200px",
    borderRadius: "50%",
    margin: "0 50px 0 0 ",
    "@media (max-width: 767px)": {
      marginRight: 0
    }
  }),
  displayName: css({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    margin: "10px 0 10px 0",
    "& > span": {
      margin: "0 0 0 10px"
    },
    "& a": {
      color: "inherit"
    },
    "& svg": {
      width: 16,
      height: 16,
      margin: "5px 0 0 0"
    },
    "@media (max-width: 767px)": {
      flexDirection: "column",
      "& > span": {
        marginLeft: 0
      }
    }
  }),
  followersCount: css({
    margin: "0 0 15px 0",
    "@media (max-width: 767px)": {
      marginBottom: 10
    }
  }),
  biography: css({
    margin: "0 0 23px 0",
    lineHeight: "1.5",
    fontSize: 15,
    "@media (max-width: 767px)": {
      marginBottom: 15
    }
  }),
  tagsContainer: css({
    margin: "0 0 20px 0",
    "@media (max-width: 767px)": {
      marginBottom: 10
    }
  }),
  tags: css({
    display: "inline-block",
    backgroundColor: "rgba(24, 26, 40, 0.1)",
    margin: "0 10px 10px 0",
    padding: "7px 10px",
    fontWeight: 700,
    borderRadius: 3,
    fontSize: 13,
    textDecoration: "none",
    color: "#181a28",
    "&:last-child": {
      marginRight: 0
    }
  }),
  sectionTitle: css({
    "@media (max-width: 767px)": {
      textAlign: "center"
    }
  }),
  endorse: css({
    display: "flex",
    justifyContent: "stretch",
    alignItems: "flex-start",
    "& > *": {
      width: "calc((100% - 50px) / 2)"
    },
    "@media (max-width: 767px)": {
      flexDirection: "column",
      "& > *": {
        width: "100%"
      }
    }
  }),
  endorseDetail: css({
    display: "flex",
    flexDirection: "column",
    "& + &": {
      margin: "30px 0 0 0"
    },
    "@media (max-width: 767px)": {
      "& + &": {
        marginTop: 20
      }
    }
  }),
  endorseDetailTitle: css({
    display: "flex",
    alignItems: "center",
    fontWeight: 600,
    fontSize: 20,
    "& > svg": {
      width: 40,
      height: 40,
      margin: "0 15px 0 0"
    }
  }),
  endorseDetailValue: css({
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    margin: "5px 0 0 0",
    fontSize: 14,
    "& > span": {
      margin: "0 7px 0 0"
    },
    "& > strong": {
      fontSize: 20,
      fontWeight: 600,
      color: "#39bdcc"
    },
    "@media (max-width: 767px)": {
      flexDirection: "column",
      alignItems: "flex-start",
      marginLeft: 50,
      "& > span": {
        marginBottom: 5
      }
    }
  }),
  contactList: css({
    display: "block",
    margin: 0,
    padding: 0,
    listStyleType: "none",
    "@media (max-width: 767px)": {
      marginTop: 25
    }
  }),
  contactDetail: css({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: "0 0 10px 0",
    "@media (max-width: 767px)": {
      marginRight: 0
    }
  }),
  contactText: css({
    width: "calc(100% - 50px)",
    overflowWrap: "break-word",
    wordWrap: "break-word",
    hyphens: "auto"
  }),
  icon: css({
    flex: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: "50%",
    backgroundColor: "#111",
    margin: "2px 10px 0 0",
    "& > svg": {
      width: 26,
      height: 26,
      color: "#fff"
    }
  }),
  smallIcon: css({
    margin: "6px 10px 4px 0",
    "& > svg": {
      width: 26,
      height: 20
    }
  }),
  list: css({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "stretch",
    margin: 0,
    padding: 0,
    listStyleType: "none",
    "@media (max-width: 767px)": {
      marginTop: 20
    }
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
    },
    "@media (max-width: 767px)": {
      width: "100%",
      marginRight: 0,
      "&:nth-last-child(-n+3)": {
        marginBottom: 25
      }
    }
  }),
  photo: css({
    position: "absolute",
    top: 0,
    left: 0,
    display: "block",
    width: "100%",
    height: "100%",
    textDecoration: "none",
    overflow: "hidden",
    "&:hover > *:first-child": {
      top: "-5px",
      left: "-5px",
      width: "calc(100% + 10px)",
      height: "calc(100% + 10px)"
    }
  }),
  photoImage: css({
    position: "absolute",
    top: 0,
    left: 0,
    display: "block",
    width: "100%",
    height: "100%",
    backgroundColor: "#555",
    backgroundSize: "cover",
    backgroundPosition: "center",
    transition: ".3s",
    "@media (max-width: 767px)": {
      borderRadius: 3
    }
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
    },
    "@media (max-width: 767px)": {
      opacity: 1,
      top: "auto",
      bottom: 0,
      height: "auto",
      borderRadius: "0 0 3px 3px"
    }
  }),
  overlayText: css({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    "& svg": {
      marginRight: 7
    }
  }),
  timestamp: css({
    textAlign: "right",
    fontSize: 13,
    fontStyle: "italic",
    margin: "25px 0 0 0",
    "@media (max-width: 767px)": {
      textAlign: "center",
      marginTop: 0
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
  }).isRequired,
  isOwner: PropTypes.bool.isRequired
};

export default InfluencerDetail;
