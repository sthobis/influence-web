import React from "react";
import Page from "../components/Page";
import { Link } from "react-router-dom";

const Home = () => (
  <Page
    className="page-home"
    title="Influence - Find the perfect influencer for your business"
  >
    <Link to="/influencer">Influencer List</Link>
  </Page>
);

export default Home;
