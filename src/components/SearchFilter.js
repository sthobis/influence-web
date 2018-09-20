import { css } from "emotion";
import PropTypes from "prop-types";
import React from "react";

const styles = {
  root: css({
    margin: "50px 0 0 0"
  }),
  textInput: css({
    display: "block",
    width: "100%",
    padding: "15px 10px",
    backgroundColor: "#fff",
    border: "none",
    borderRadius: 5,
    fontSize: 15
  })
};

const SearchFilter = ({ keyword, setFilter }) => (
  <div className={styles.root}>
    <input
      type="text"
      value={keyword}
      placeholder="Cari influencer.."
      className={styles.textInput}
      onChange={e => setFilter(e.target.value)}
    />
  </div>
);

SearchFilter.propTypes = {
  keyword: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired
};

export default SearchFilter;
