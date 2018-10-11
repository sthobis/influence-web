import { css, cx, keyframes } from "emotion";
import React, { Component } from "react";
import {
  FaCommentDots,
  FaEnvelope,
  FaHeart,
  FaMapMarkerAlt
} from "react-icons/fa";
import { connect } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Notification from "../components/Notification";
import { setUser } from "../store";
import parseUserFromCookie from "../utils/parseUserFromCookie";

class Home extends Component {
  static getInitialProps({ req, store }) {
    if (req) {
      // server-rendered
      const { user, accessToken } = parseUserFromCookie(req.headers.cookie);
      if (user) {
        // user is logged in,  save user session for client rehydration
        store.dispatch(setUser(user, accessToken));
      }
    }
  }

  componentDidMount() {
    document.title = "Igfluencer";
  }

  render() {
    return (
      <div className={styles.root}>
        <Header className={styles.maxWidth} />
        <main>
          <section className={cx(styles.coverSection, styles.maxWidth)}>
            <div className={styles.coverLeft}>
              <h1>Find top instagram influencers in Indonesia</h1>
              <p>
                <strong>igfluencer.id</strong> will help you find the right
                influencer to
                <br />
                promote your brand and reach more audience.
              </p>
            </div>
            <div className={styles.coverRight}>
              <div className={styles.coverIllustration}>
                <FaHeart />
                <FaHeart />
                <FaHeart />
                <FaCommentDots />
                <FaCommentDots />
                <FaCommentDots />
                <img
                  src="/static/images/section-1.svg"
                  alt="Find top instagram influencers in Indonesia"
                />
              </div>
            </div>
          </section>
          <section className={styles.roleSection}>
            <h2>How it Works</h2>
            <div className={cx(styles.role, styles.maxWidth)}>
              <div
                className={cx(styles.roleImage, styles.advertiserIllustration)}
              >
                <FaMapMarkerAlt />
                <FaMapMarkerAlt />
                <FaMapMarkerAlt />
                <img
                  src="/static/images/section-2-advertiser.svg"
                  alt="advertiser"
                />
              </div>
              <div className={styles.roleDescription}>
                <h3>As an Advertiser</h3>
                <ol>
                  <li>
                    Authenticate yourself as Advertiser using your google
                    account.
                  </li>
                  <li>
                    Check influencer list to find suitable candidate for your
                    marketing campaign.
                  </li>
                  <li>
                    Contact your favorite influencers through their contact info
                    to discuss potential endorsement contract.
                  </li>
                </ol>
              </div>
            </div>
            <div className={cx(styles.role, styles.maxWidth)}>
              <div className={styles.roleDescription}>
                <h3>As an Influencer</h3>
                <ol>
                  <li>
                    Authenticate yourself as Influencer using your instagram
                    account.
                  </li>
                  <li>
                    Update your profile details so potential advertiser will
                    know you better.
                  </li>
                  <li>
                    Congratulations, you're now included in igfluencer.id's
                    influencer list and are exposed to future endorsement
                    contract from advertiser.
                  </li>
                </ol>
              </div>
              <div
                className={cx(styles.roleImage, styles.influencerIllustration)}
              >
                <FaEnvelope />
                <FaEnvelope />
                <img
                  src="/static/images/section-2-influencer.svg"
                  alt="influencer"
                />
              </div>
            </div>
          </section>
        </main>
        <div className={styles.footerContainer}>
          <Footer className={styles.maxWidth} />
        </div>
        <Notification />
      </div>
    );
  }
}

const pop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10px) scale(0.5);
  }

  25% {
    opacity: 1;
    transform: translateY(-20px) scale(1.2);
  }

  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const blink = keyframes`
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

const styles = {
  root: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "center",
    position: "relative",
    minHeight: "100vh",
    backgroundColor: "#f6faff",
    overflow: "hidden"
  }),
  maxWidth: css({
    width: "100%",
    maxWidth: 1200,
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: 50,
    paddingRight: 50
  }),
  coverSection: css({
    position: "relative",
    display: "flex",
    alignItems: "stretch",
    padding: "0 0 50px 0",
    "& > *": {
      position: "relative",
      zIndex: 2
    }
  }),
  coverLeft: css({
    display: "flex",
    flexDirection: "column",
    width: "55%",
    padding: "100px 50px 50px 0",
    "& h1": {
      fontSize: 36,
      lineHeight: "1.1",
      margin: "0 0 15px 0",
      color: "#181a28"
    },
    "& p": {
      fontSize: 18,
      margin: 0
    }
  }),
  coverRight: css({
    width: "45%",
    padding: "50px 0",
    textAlign: "right",
    "& img": {
      width: "100%"
    }
  }),
  coverIllustration: css({
    position: "relative",
    "& svg": {
      width: "3.3%",
      position: "absolute",
      "&:nth-child(1)": {
        color: "#ff4b84",
        top: "25%",
        left: "13%",
        animation: `${pop} 1s ease infinite`
      },
      "&:nth-child(2)": {
        color: "#ff4b84",
        top: "1%",
        right: "39%",
        animation: `${pop} 1.5s ease infinite`
      },
      "&:nth-child(3)": {
        color: "#ff4b84",
        top: "36%",
        left: "45%",
        animation: `${pop} 2s ease infinite`
      },
      "&:nth-child(4)": {
        color: "#a0a0a0",
        top: "25%",
        left: "22%",
        animation: `${pop} 1.25s ease infinite`
      },
      "&:nth-child(5)": {
        color: "#a0a0a0",
        top: "1%",
        right: "27%",
        animation: `${pop} 2.25s ease infinite`
      },
      "&:nth-child(6)": {
        color: "#a0a0a0",
        top: "36%",
        left: "61%",
        animation: `${pop} 1.75s ease infinite`
      }
    }
  }),
  roleSection: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "75px 0 100px 0",
    "& > h2": {
      display: "inline-block",
      margin: "0 auto 50px auto",
      padding: "0 5px 8px 5px",
      fontSize: 32,
      borderBottom: "6px solid #e4e3ea"
    }
  }),
  role: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& + &": {
      marginTop: 75
    }
  }),
  roleImage: css({
    width: "40%",
    "& img": {
      width: "100%"
    }
  }),
  advertiserIllustration: css({
    position: "relative",
    "& svg": {
      position: "absolute",
      width: "2.5%",
      color: "#efd8a3",
      "&:nth-child(1)": {
        top: "47%",
        left: "74%",
        animation: `${blink} 1s ease infinite`
      },
      "&:nth-child(2)": {
        top: "37%",
        left: "34%",
        animation: `${blink} 2.3s ease infinite`
      },
      "&:nth-child(3)": {
        top: "32%",
        left: "64%",
        animation: `${blink} 1.4s ease infinite`
      }
    }
  }),
  influencerIllustration: css({
    position: "relative",
    "& img": {
      position: "relative",
      zIndex: 1,
      opacity: ".9"
    },
    "& svg": {
      position: "absolute",
      zIndex: 2,
      width: "3%",
      color: "#fff",
      "&:nth-child(1)": {
        top: "61%",
        left: "41%",
        animation: `${pop} 1s ease infinite`
      },
      "&:nth-child(2)": {
        top: "60%",
        left: "53%",
        animation: `${pop} 1.4s ease infinite`
      }
    }
  }),
  roleDescription: css({
    "&:first-child": {
      paddingRight: 100
    },
    "&:last-child": {
      paddingLeft: 100
    },
    "& h3": {
      margin: "0 0 10px 0",
      fontSize: 28
    },
    "& ol": {
      margin: "0",
      padding: "0 0 0 17px"
    },
    "& li": {
      fontSize: 18,
      margin: "0 0 5px 0"
    }
  }),
  footerContainer: css({
    background: "#20223a"
  })
};

const stateToProps = ({ user }) => ({ user });

export default connect(stateToProps)(Home);
