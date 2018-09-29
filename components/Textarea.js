import PropTypes from "prop-types";
import React, { Component } from "react";

class Textarea extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.adjustHeight();
    }, 0);
    window.addEventListener("resize", this.adjustHeight);
  }

  componentDidUpdate() {
    this.adjustHeight();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.adjustHeight);
  }

  adjustHeight = () => {
    if (this.textarea) {
      this.textarea.style.height = "auto";
      // border
      let newHeight = this.textarea.scrollHeight + 2;
      this.textarea.style.height = newHeight + "px";
    }
  };

  render() {
    const { onChange } = this.props;
    return (
      <textarea
        {...this.props}
        rows="1"
        ref={el => (this.textarea = el)}
        onChange={onChange}
      />
    );
  }
}

Textarea.defaultProps = {
  onChange: () => {}
};

Textarea.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func
};

export default Textarea;
