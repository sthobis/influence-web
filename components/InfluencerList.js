import { css } from "emotion";
import PropTypes from "prop-types";
import React from "react";
import InfluencerItem from "./InfluencerItem";
import Localize from "./Localize";

const InfluencerList = ({ influencers, viewType }) => (
  <Localize selector="components.influencerList">
    {localized =>
      influencers.length > 0 ? (
        <ul className={styles.list}>
          {influencers.map(influencer => (
            <li key={influencer._id} className={styles.listItem}>
              <InfluencerItem influencer={influencer} viewType={viewType} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>{localized[0]}.</p>
      )
    }
  </Localize>
);

const styles = {
  list: css({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "stretch",
    flexWrap: "wrap",
    margin: "50px 0 0 0",
    padding: 0,
    listStyleType: "none",
    "@media (max-width: 767px)": {
      flexDirection: "column"
    },
    "@media (max-width: 767px)": {
      marginTop: 40
    }
  }),
  listItem: css({
    display: "block",
    width: "calc((100% - 100px) / 3)",
    margin: "0 50px 50px 0",
    backgroundColor: "#fff",
    borderRadius: 5,
    boxShadow: "0 0 30px rgba(35, 0, 95, 0.05)",
    "&:nth-child(3n)": {
      marginRight: 0
    },
    "@media (max-width: 959px)": {
      width: "calc((100% - 50px) / 2)",
      "&:nth-child(3n)": {
        marginRight: 50
      },
      "&:nth-child(2n)": {
        marginRight: 0
      }
    },
    "@media (max-width: 767px)": {
      width: "100%",
      marginRight: 0,
      marginBottom: 40,
      "&:nth-child(3n)": {
        marginRight: 0
      }
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
