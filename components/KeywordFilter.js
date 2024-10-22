import { css } from "emotion";
import PropTypes from "prop-types";
import React from "react";
import Localize from "./Localize";

const KeywordFilter = ({ keyword, setFilter }) => (
  <Localize selector="components.keywordFilter">
    {localized => (
      <input
        type="text"
        value={keyword}
        placeholder={localized[0]}
        className={styles.textInput}
        onChange={e => setFilter("keyword", e.target.value)}
      />
    )}
  </Localize>
);

const styles = {
  textInput: css({
    display: "block",
    width: "100%",
    margin: "0 0 25px 0",
    padding: "15px 20px",
    backgroundColor: "#fff",
    border: "none",
    borderRadius: 5,
    fontSize: 15,
    boxShadow: "0 0 30px rgba(35, 0, 95, 0.05)"
  })
};

KeywordFilter.propTypes = {
  keyword: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired
};

export default KeywordFilter;
