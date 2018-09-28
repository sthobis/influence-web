import { css } from "emotion";
import PropTypes from "prop-types";
import React from "react";
import Select from "react-select";

const TagFilter = ({ tags, setFilter }) => (
  <Select
    value={tags.map(tag => ({ label: tag, value: tag }))}
    isMulti
    instanceId="tags-filter"
    name="tags"
    options={[
      { label: "general", value: "general" },
      { label: "food", value: "food" },
      { label: "comedy", value: "comedy" }
    ]}
    className={styles.select}
    styles={{
      control: base => ({ ...base, ...styles.control }),
      valueContainer: base => ({
        ...base,
        ...styles.valueContainer
      }),
      placeholder: base => ({
        ...base,
        ...styles.placeholder
      }),
      input: base => ({ ...base, ...styles.input }),
      multiValue: base => ({ ...base, ...styles.multiValue }),
      multiValueLabel: base => ({
        ...base,
        ...styles.multiValueLabel
      }),
      multiValueRemove: base => ({
        ...base,
        ...styles.multiValueRemove
      }),
      option: (base, { isFocused }) => ({
        ...base,
        ...styles.option,
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
      clearIndicator: base => ({ ...base, ...styles.indicators }),
      dropdownIndicator: base => ({ ...base, ...styles.indicators }),
      noOptionsMessage: base => ({ ...base, ...styles.option })
    }}
    onChange={values => setFilter("tags", values.map(o => o.value))}
  />
);

const styles = {
  select: css({
    display: "block",
    width: "50%"
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
  placeholder: {
    margin: "0 0 0 5px"
  },
  input: {
    margin: "0 0 0 5px"
  },
  multiValue: {
    backgroundColor: "rgba(0, 184, 217, 0.1)",
    color: "rgb(0, 184, 217)",
    padding: "0 0 0 12px",
    borderRadius: 5
  },
  multiValueLabel: {
    color: "rgb(0, 184, 217)",
    fontWeight: 600,
    fontSize: 13,
    margin: "0 8px 0 0",
    padding: 0,
    paddingLeft: 0,
    lineHeight: "28px"
  },
  multiValueRemove: {
    margin: 0,
    padding: 8,
    cursor: "pointer",
    borderRadius: "0 5px 5px 0"
  },
  option: {
    fontSize: 14
  },
  menu: {
    boxShadow: "0 0 20px rgba(35, 0, 95, 0.15)"
  },
  menuList: {
    paddingTop: 0,
    paddingBottom: 0
  },
  indicators: {
    cursor: "pointer"
  }
};

TagFilter.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  setFilter: PropTypes.func.isRequired
};

export default TagFilter;
