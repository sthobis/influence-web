import { css } from "emotion";
import PropTypes from "prop-types";
import React from "react";
import InfluencerItem from "./InfluencerItem";

const InfluencerList = ({ influencers, viewType }) => (
  <>
    {influencers.length > 0 ? (
      <ul className={styles.list}>
        {influencers.map(influencer => (
          <li key={influencer._id} className={styles.listItem}>
            <InfluencerItem influencer={influencer} viewType={viewType} />
          </li>
        ))}
      </ul>
    ) : (
      <p className={styles.empty}>No influencers found.</p>
    )}
  </>
);

const styles = {
  list: css({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "stretch",
    flexWrap: "wrap",
    margin: "50px 0 0 0",
    padding: 0,
    listStyleType: "none"
  }),
  listItem: css({
    display: "block",
    width: "calc((100% - 100px) / 3)",
    margin: "0 50px 50px 0",
    backgroundColor: "#fff",
    borderRadius: 5,
    boxShadow: "0 0 30px rgba(35, 0, 95, 0.05)",
    "&:nth-child(3n+3)": {
      marginRight: 0
    }
  }),
  empty: css({
    margin: "50px 0"
  })
};

InfluencerList.defaultProps = {
  viewType: "card"
};

InfluencerList.propTypes = {
  influencers: PropTypes.arrayOf(PropTypes.object).isRequired,
  viewType: PropTypes.oneOf(["card", "list"])
};

export default InfluencerList;
