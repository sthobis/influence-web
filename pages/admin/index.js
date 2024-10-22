import { css } from "emotion";
import produce from "immer";
import uniq from "lodash/uniq";
import Router from "next/router";
import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import { connect } from "react-redux";
import Layout from "../../components/Layout";
import Textarea from "../../components/Textarea";
import CONFIG from "../../config";
import { addNotification, setLanguage, setUser } from "../../store";
import {
  authAdministrator,
  crawlInstagramUser,
  getInfluencerList
} from "../../utils/api";
import getUserGroup from "../../utils/getUserGroup";
import parseCookie from "../../utils/parseCookie";

const CRAWL_STATUS = {
  QUEUE: "QUEUE",
  PROCESSING: "PROCESSING",
  FAILED: "FAILED",
  SUCCEED: "SUCCEED",
  CANCELLED: "CANCELLED"
};

const CRAWL_STATUS_NUMBER = {
  PROCESSING: 0,
  QUEUE: 1,
  FAILED: 2,
  CANCELLED: 3,
  SUCCEED: 4
};

class AdminDashboardPage extends Component {
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
      Router.push("/admin");
    } catch (err) {
      addNotification("Failed to login as administrator.");
    }
  };

  crawl = async (opts = { throttle: true }) => {
    const { crawlStatus } = this.state;

    const start = crawlStatus.findIndex(
      item => item.status === CRAWL_STATUS.QUEUE
    );

    for (let counter = start; counter < crawlStatus.length; counter += 5) {
      if (!this.state.isCrawling) {
        console.log(
          "Timed out, resuming crawling process on ",
          new Date(new Date().getTime() + 600000)
        );
        setTimeout(this.resumeCrawling, 600000);
        break;
      }
      try {
        // set visualization status to on processing
        // for 5 users being crawled
        this.setState(
          produce(draft => {
            for (
              let i = counter;
              i < counter + 5 && i < crawlStatus.length;
              i++
            ) {
              draft.crawlStatus[i].status = CRAWL_STATUS.PROCESSING;
            }
          })
        );

        // sent crawl request for the 5 users to crawler API
        let crawlRequests = crawlStatus
          .slice(counter, counter + 5)
          .map(({ username }) =>
            crawlInstagramUser(username)
              .then(res => {
                // on success
                // set visualization status to succeed
                // for 5 users being crawled
                this.setState(
                  produce(draft => {
                    const index = crawlStatus.findIndex(
                      item => item.username === username
                    );
                    draft.crawlStatus[index].status = CRAWL_STATUS.SUCCEED;
                  })
                );
              })
              .catch(err => {
                // on failure
                // set visualization status to failed
                // for 5 users being crawled
                this.setState(
                  produce(draft => {
                    const index = crawlStatus.findIndex(
                      item => item.username === username
                    );
                    draft.crawlStatus[index].status = CRAWL_STATUS.FAILED;
                    const errorMessage = err.response
                      ? err.response.data.error
                      : "unknown error";
                    draft.crawlStatus[index].message = errorMessage;
                    if (errorMessage.includes("429")) {
                      // we're being rate limited
                      // pause crawling to prevent spam-flagged
                      this.setState({ isCrawling: false });
                    }
                  })
                );
              })
          );
        // 5 seconds timer to throttle crawl request
        // to prevent being timed-out by instagram (HTTP ERROR 429: Too Many Requests)
        // max 60 users per minute
        if (opts.throttle) {
          const throttleDuration = new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve();
            }, 5000);
          });
          crawlRequests.push(throttleDuration);
        }
        await Promise.all(crawlRequests);
      } catch (err) {
        console.log(err);
        break;
      }
    }
    this.setState({ isCrawling: false });
  };

  startCrawling = (opts = {}) => {
    const { usernames } = this.state;

    // set visualization status for all users to queue
    const crawlStatus = uniq(usernames).map(username => ({
      username,
      status: CRAWL_STATUS.QUEUE,
      message: ""
    }));
    this.setState({ crawlStatus, isCrawling: true }, () => this.crawl(opts));
  };

  resumeCrawling = () => {
    this.setState({ isCrawling: true }, this.crawl);
  };

  recrawlAllInfluencer = async () => {
    this.setState({ isCrawling: true });
    try {
      let { influencers } = await getInfluencerList({
        page: 0,
        limit: 0,
        keyword: "",
        tags: [],
        sort: { followersCount: -1 }
      });
      influencers = influencers.map(influencer => influencer.instagramHandle);
      this.setState(
        { usernames: influencers, textareaValue: influencers.join(" ") },
        () => this.startCrawling()
      );
    } catch (err) {
      this.setState({ isCrawling: false });
      addNotification("Failed to fetch influencers data.");
    }
  };

  recrawlFailedInfluencer = () => {
    const { crawlStatus } = this.state;
    this.setState({ isCrawling: true });
    const influencers = crawlStatus
      .filter(o => o.status === CRAWL_STATUS.FAILED)
      .map(o => o.username);
    this.setState(
      { usernames: influencers, textareaValue: influencers.join(" ") },
      () => this.startCrawling()
    );
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
                maxHeight={500}
                className={styles.textarea}
                onChange={e =>
                  this.setState({
                    usernames: e.target.value.trim().split(" "),
                    textareaValue: e.target.value
                  })
                }
              />
              <button
                type="button"
                onClick={this.startCrawling}
                disabled={isCrawling}
                className={styles.button}
              >
                {isCrawling
                  ? "crawling.. please wait"
                  : "start/resume crawling"}
              </button>
              <button
                type="button"
                onClick={this.recrawlAllInfluencer}
                disabled={isCrawling}
                className={styles.button}
              >
                {isCrawling
                  ? "crawling.. please wait"
                  : "update all influencer"}
              </button>
              <button
                type="button"
                onClick={this.recrawlFailedInfluencer}
                disabled={
                  isCrawling ||
                  crawlStatus.filter(o => o.status === CRAWL_STATUS.FAILED)
                    .length === 0
                }
                className={styles.button}
              >
                {isCrawling
                  ? "crawling.. please wait"
                  : "recrawl failed influencer"}
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
                  maxHeight={500}
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
                        {user.message && <div>{user.message}</div>}
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
    alignItems: "flex-start",
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
    margin: "0 0 20px 0",
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
)(AdminDashboardPage);
