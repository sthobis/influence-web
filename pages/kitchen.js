import { css } from "emotion";
import produce from "immer";
import Router from "next/router";
import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import { connect } from "react-redux";
import Layout from "../components/Layout";
import Textarea from "../components/Textarea";
import CONFIG from "../config";
import { addNotification, setLanguage, setUser } from "../store";
import { authAdministrator, crawlInstagramUser } from "../utils/api";
import getUserGroup from "../utils/getUserGroup";
import parseCookie from "../utils/parseCookie";

/*
 * 🔥 WARNING 🔥
 * FOR NOW, THIS IS JUST FOR AN EASIER DX 💩
 * LATER ON THIS PAGE SHOULD BE REMOVED FROM INFLUENCE-WEB 💩
 * AND REWRITTEN + CONTAINED IN ANOTHER APPS/MICRO-FRONTEND 💩
 * 🔥 WARNING 🔥
 */

const CRAWL_STATUS = {
  QUEUE: "QUEUE",
  PROCESSING: "PROCESSING",
  FAILED: "FAILED",
  SUCCEED: "SUCCEED",
  CANCELLED: "CANCELLED"
};

const CRAWL_STATUS_NUMBER = {
  PROCESSING: 0,
  FAILED: 1,
  CANCELLED: 2,
  SUCCEED: 3,
  QUEUE: 4
};

class Kitchen extends Component {
  static async getInitialProps({ req, res, store, query }) {
    if (req) {
      // server-rendered
      const { user, accessToken, language } = parseCookie(req.headers.cookie);
      store.dispatch(setLanguage(language));
      if (user) {
        store.dispatch(setUser(user, accessToken));
        return {
          isAdmin: getUserGroup(accessToken) === CONFIG.GROUP.SUPER_ADMIN
        };
      } else {
        return { isAdmin: false };
      }
    } else {
      // client-rendered
      const { user, accessToken } = store.getState();
      if (user) {
        return {
          isAdmin: getUserGroup(accessToken) === CONFIG.GROUP.SUPER_ADMIN
        };
      } else {
        return { isAdmin: false };
      }
    }
  }

  state = {
    textareaValue: "",
    usernames: [],
    crawlStatus: [],
    isCrawling: false
  };

  loginAsAdmin = async data => {
    const { setUser } = this.props;

    const token = data.tokenId;
    try {
      const { administrator, accessToken } = await authAdministrator({ token });
      setUser(administrator, accessToken);
      Router.push("/kitchen");
    } catch (err) {
      addNotification("💩");
    }
  };

  startCrawling = () => {
    const { usernames } = this.state;

    // set visualization status for all users to queue
    const crawlStatus = usernames.map(username => ({
      username,
      status: CRAWL_STATUS.QUEUE
    }));
    this.setState({ crawlStatus, isCrawling: true }, async () => {
      try {
        for (let counter = 0; counter < usernames.length; counter += 5) {
          // set visualization status to on processing
          // for 5 users being crawled
          this.setState(
            produce(draft => {
              for (
                let i = counter;
                i < counter + 5 && i < usernames.length;
                i++
              ) {
                draft.crawlStatus[i].status = CRAWL_STATUS.PROCESSING;
              }
            })
          );

          // sent crawl request for the 5 users to crawler API
          await Promise.all(
            usernames.slice(counter, counter + 5).map(username =>
              crawlInstagramUser(username)
                .then(res => {
                  // on success
                  // set visualization status to succeed
                  // for 5 users being crawled
                  this.setState(
                    produce(draft => {
                      const index = usernames.findIndex(
                        _username => _username === username
                      );
                      draft.crawlStatus[index].status = CRAWL_STATUS.SUCCEED;
                    })
                  );
                })
                .catch(res => {
                  // on failure
                  // set visualization status to failed
                  // for 5 users being crawled
                  this.setState(
                    produce(draft => {
                      const index = usernames.findIndex(
                        _username => _username === username
                      );
                      draft.crawlStatus[index].status = CRAWL_STATUS.FAILED;
                    })
                  );
                })
            )
          );
        }
      } catch (err) {
        // no-op
      } finally {
        this.setState({ isCrawling: false });
      }
    });
  };

  render() {
    const { isAdmin } = this.props;
    const { textareaValue, crawlStatus, isCrawling } = this.state;
    let success = 0,
      failure = 0,
      processing = 0,
      queue = 0;
    crawlStatus.forEach(user => {
      if (user.status === CRAWL_STATUS.SUCCEED) {
        success++;
      } else if (user.status === CRAWL_STATUS.FAILED) {
        failure++;
      } else if (user.status === CRAWL_STATUS.PROCESSING) {
        processing++;
      } else if (user.status === CRAWL_STATUS.QUEUE) {
        queue++;
      }
    });

    return (
      <Layout>
        {isAdmin ? (
          <div className={styles.root}>
            <div className={styles.leftPanel}>
              <Textarea
                value={textareaValue}
                placeholder="Insert instagram usernames, separated by space"
                className={styles.textarea}
                onChange={e =>
                  this.setState({
                    usernames: e.target.value.trim().split(" "),
                    textareaValue: e.target.value
                  })
                }
              />
              <button
                onClick={this.startCrawling}
                disabled={isCrawling}
                className={styles.button}
              >
                {isCrawling ? "crawling.. please wait" : "start crawling"}
              </button>
              <p className={styles.summary}>
                {queue} queue
                <br />
                {processing} processing
                <br />
                {success} success
                <br />
                {failure} failed
              </p>
              {failure > 0 && (
                <Textarea
                  value={
                    "Failed users :\n" +
                    crawlStatus
                      .filter(user => user.status === CRAWL_STATUS.FAILED)
                      .map(user => user.username)
                      .join(" ")
                  }
                  className={styles.textarea}
                  disabled
                />
              )}
            </div>
            <div className={styles.rightPanel}>
              {crawlStatus.length ? (
                <ul className={styles.list}>
                  {crawlStatus
                    .slice()
                    .sort(
                      (a, b) =>
                        CRAWL_STATUS_NUMBER[a.status] -
                        CRAWL_STATUS_NUMBER[b.status]
                    )
                    .map(user => (
                      <li
                        key={user.username}
                        className={`${styles.listItem} ${
                          styles.status[user.status]
                        }`}
                      >
                        @<strong>{user.username}</strong> -{" "}
                        <strong>{user.status}</strong>
                      </li>
                    ))}
                </ul>
              ) : (
                <p className={styles.ready}>Ready to crawl.</p>
              )}
            </div>
          </div>
        ) : (
          <GoogleLogin
            clientId="753672082179-m23j4kahvq4qpp3e586rrmkiftdsau6d.apps.googleusercontent.com"
            buttonText="🔥 Enter Kitchen 🔥"
            onSuccess={this.loginAsAdmin}
            onFailure={console.log}
          />
        )}
      </Layout>
    );
  }
}

const styles = {
  root: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "stretch",
    padding: 50,
    backgroundColor: "#fff",
    borderRadius: 5,
    boxShadow: "0 0 30px rgba(35, 0, 95, 0.05)"
  }),
  leftPanel: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    width: "calc(50% - 25px)"
  }),
  rightPanel: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    width: "calc(50% - 25px)"
  }),
  textarea: css({
    width: "100%",
    borderRadius: 5,
    fontSize: 15,
    padding: 20,
    border: "1px solid #ddd",
    resize: "none",
    margin: "0 0 20px 0"
  }),
  button: css({
    background: "turquoise",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    fontWeight: 600,
    fontSize: 16,
    margin: "0 0 20px 0",
    padding: "10px 15px",
    cursor: "pointer"
  }),
  summary: css({
    margin: "0 0 20px 0",
    fontSize: 15
  }),
  list: css({
    margin: 0,
    padding: 0,
    listStyleType: "none",
    maxHeight: 500,
    overflowY: "auto"
  }),
  listItem: css({
    display: "block",
    margin: "0 0 10px 0",
    padding: 10,
    fontSize: 14,
    borderRadius: 5,
    transition: ".3s",
    "& > *": {
      fontWeight: 600
    }
  }),
  status: {
    QUEUE: css({
      color: "rgb(56, 103, 214)",
      backgroundColor: "rgba(56, 103, 214, 0.1)"
    }),
    PROCESSING: css({
      color: "rgb(247, 183, 49)",
      backgroundColor: "rgba(247, 183, 49, 0.1)"
    }),
    FAILED: css({
      color: "rgb(235, 59, 90)",
      backgroundColor: "rgba(235, 59, 90, 0.1)"
    }),
    SUCCEED: css({
      color: "rgb(32, 191, 107)",
      backgroundColor: "rgba(32, 191, 107, 0.1)"
    }),
    CANCELLED: css({
      color: "rgb(75, 101, 132)",
      backgroundColor: "rgba(75, 101, 132, 0.1)"
    })
  },
  ready: css({
    margin: 0,
    color: "#777",
    textAlign: "center"
  })
};

export default connect(
  null,
  { setUser }
)(Kitchen);
