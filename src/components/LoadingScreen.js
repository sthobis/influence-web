import { css } from "emotion";
import React from "react";

const styles = {
  root: css({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 10005,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(255,255,255,0.5)"
  })
};

const LoadingScreen = () => (
  <div className={styles.root}>
    <h1>LOADING</h1>
  </div>
);

export default LoadingScreen;
