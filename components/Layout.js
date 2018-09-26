import { css } from "emotion";
import React, { PureComponent } from "react";

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

class Layout extends PureComponent {
  componentDidMount() {
    const { title } = this.props;
    document.title = title || "Influence";
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

export default Layout;
