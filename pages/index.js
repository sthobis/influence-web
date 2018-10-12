import { css, cx, keyframes } from "emotion";
import React, { Component } from "react";
import { FaCommentDots, FaHeart } from "react-icons/fa";
import { connect } from "react-redux";
import AdvertiserIllustration from "../components/AdvertiserIllustration";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InfluencerIllustration from "../components/InfluencerIllustration";
import Localize from "../components/Localize";
import Notification from "../components/Notification";
import { setLanguage, setUser } from "../store";
import parseCookie from "../utils/parseCookie";

class Home extends Component {
  static getInitialProps({ req, store }) {
    if (req) {
      // server-rendered
      const { user, accessToken, language } = parseCookie(req.headers.cookie);
      store.dispatch(setLanguage(language));
      if (user) {
        // user is logged in,  save user session for client rehydration
        store.dispatch(setUser(user, accessToken));
      }
    }
  }

  componentDidMount() {
    document.title = "Igfluencer.id";
  }

  render() {
    return (
      <Localize selector="pages.index">
        {localized => (
          <div className={styles.root}>
            <Header />
            <main>
              <section
                className={cx(styles.introductionSection, styles.container)}
              >
                <div className={styles.introductionLeft}>
                  <h1>{localized[0]}</h1>
                  <p>
                    <strong>igfluencer.id</strong> {localized[1]}.
                  </p>
                </div>
                <div className={styles.introductionRight}>
                  <div className={styles.introductionIllustration}>
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
                <h2>{localized[2]}</h2>
                <div className={cx(styles.role, styles.container)}>
                  <div className={styles.roleThumbnail}>
                    <AdvertiserIllustration />
                  </div>
                  <div className={styles.roleText}>
                    <h3>{localized[3]}</h3>
                    <ol>
                      <li>{localized[4]}.</li>
                      <li>{localized[5]}.</li>
                      <li>{localized[6]}.</li>
                    </ol>
                  </div>
                </div>
                <div className={cx(styles.role, styles.container)}>
                  <div className={styles.roleText}>
                    <h3>{localized[7]}</h3>
                    <ol>
                      <li>{localized[8]}.</li>
                      <li>{localized[9]}.</li>
                      <li>{localized[10]}.</li>
                    </ol>
                  </div>
                  <div className={styles.roleThumbnail}>
                    <InfluencerIllustration />
                  </div>
                </div>
              </section>
            </main>
            <Footer />
            <Notification />
          </div>
        )}
      </Localize>
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

const styles = {
  root: css({
    backgroundColor: "#f6faff"
  }),
  container: css({
    width: "100%",
    maxWidth: 1200,
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: 50,
    paddingRight: 50
  }),
  introductionSection: css({
    position: "relative",
    display: "flex",
    alignItems: "stretch",
    padding: "0 0 50px 0",
    "& > *": {
      position: "relative",
      zIndex: 2
    }
  }),
  introductionLeft: css({
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
  introductionRight: css({
    width: "45%",
    padding: "50px 0",
    textAlign: "right",
    "& img": {
      width: "100%"
    }
  }),
  introductionIllustration: css({
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
  roleThumbnail: css({
    width: "40%",
    "& img": {
      width: "100%"
    }
  }),
  roleText: css({
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
  })
};

const stateToProps = ({ user }) => ({ user });

export default connect(stateToProps)(Home);
