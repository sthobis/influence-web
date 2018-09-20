import { css } from "emotion";
import React from "react";
import { Link } from "react-router-dom";
import Page from "../components/Page";

const styles = {
  root: css``
};

const HomePage = () => (
  <Page title="Influence - Find the perfect influencer for your business">
    <div className={styles.root}>
      <Link to="/influencer">Influencer List</Link>
    </div>
  </Page>
);

export default HomePage;
