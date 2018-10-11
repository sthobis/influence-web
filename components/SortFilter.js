import { css } from "emotion";
import isEqual from "lodash/isEqual";
import PropTypes from "prop-types";
import React from "react";
import Select from "react-select";
import CONFIG from "../config";

const SortFilter = ({ sort, setFilter }) => (
  <Select
    value={CONFIG.SORT_FILTER_OPTIONS.find(option =>
      isEqual(option.value, sort)
    )}
    instanceId="sort-filter"
    name="sort"
    options={CONFIG.SORT_FILTER_OPTIONS}
    className={styles.select}
    styles={{
      control: base => ({ ...base, ...styles.control }),
      valueContainer: base => ({
        ...base,
        ...styles.valueContainer
      }),
      input: base => ({ ...base, ...styles.input }),
      singleValue: base => ({ ...base, ...styles.singleValue }),
      option: (base, { isSelected, isFocused }) => ({
        ...base,
        ...styles.option,
        fontWeight: isSelected ? 700 : 400,
        backgroundColor: isFocused ? "rgba(0, 184, 217, 0.1)" : "transparent"
      }),
      menu: base => ({
        ...base,
        ...styles.menu
      }),
      menuList: base => ({
        ...base,
        ...styles.menuList
      }),
      dropdownIndicator: base => ({ ...base, ...styles.dropdownIndicator }),
      noOptionsMessage: base => ({ ...base, ...styles.option })
    }}
    onChange={selection => setFilter("sort", selection.value)}
  />
);

const styles = {
  select: css({
    display: "block",
    width: "100%"
  }),
  control: {
    backgroundColor: "#fff",
    border: "none",
    borderRadius: 5,
    fontSize: 15,
    padding: "7px 10px 7px 15px",
    boxShadow: "0 0 30px rgba(35, 0, 95, 0.05)"
  },
  valueContainer: {
    padding: 0
  },
  input: {
    margin: "0 0 0 5px"
  },
  singleValue: {
    margin: "0 0 0 5px"
  },
  option: {
    fontSize: 14,
    color: "#181a28"
  },
  menu: {
    boxShadow: "0 0 20px rgba(35, 0, 95, 0.15)"
  },
  menuList: {
    paddingTop: 0,
    paddingBottom: 0
  },
  dropdownIndicator: {
    cursor: "pointer"
  }
};

SortFilter.propTypes = {
  sort: PropTypes.object.isRequired,
  setFilter: PropTypes.func.isRequired
};

export default SortFilter;
