import { css } from "emotion";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";

class Layout extends PureComponent {
  componentDidMount() {
    const { title } = this.props;
    document.title = title;
  }

  render() {
    const { children } = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.container}>{children}</div>
      </div>
    );
  }
}

const styles = {
  root: css({
    display: "inline-block",
    position: "relative",
    width: "100%",
    height: "auto",
    minHeight: "100vh",
    backgroundColor: "#f5f8fa"
  }),
  container: css({
    width: "100%",
    maxWidth: "1200",
    margin: "0 auto",
    padding: "0 30px"
  })
};

Layout.defaultProps = {
  title: "Influence"
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
};

export default Layout;
