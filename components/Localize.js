import get from "lodash/get";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CONFIG from "../config";
import translation from "../translation";

const Localize = ({ language, selector, children }) =>
  children(get(translation[language.toLowerCase()], selector));

Localize.propTypes = {
  language: PropTypes.oneOf([CONFIG.LANGUAGE.ID, CONFIG.LANGUAGE.US])
    .isRequired,
  selector: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired
};

const stateToProps = ({ language }) => ({ language });

export default connect(stateToProps)(Localize);
