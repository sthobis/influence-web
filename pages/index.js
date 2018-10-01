import { css } from "emotion";
import Link from "next/link";
import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "../components/Layout";
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

  render() {
    return (
      <Layout>
        <div className={styles.root}>
          <Link href="/influencer">
            <a>Influencer List</a>
          </Link>
        </div>
      </Layout>
    );
  }
}

const styles = {
  root: css``
};

const stateToProps = ({ user }) => ({ user });

export default connect(stateToProps)(Home);
