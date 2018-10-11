import { css, keyframes } from "emotion";
import React from "react";
import { FaEnvelope } from "react-icons/fa";

const InfluencerIllustration = () => (
  <div className={styles.root}>
    <FaEnvelope />
    <FaEnvelope />
    <img src="/static/images/section-2-influencer.svg" alt="influencer" />
  </div>
);

const pop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10px) scale(0.5);
  }

  25% {
    opacity: 1;
    transform: translateY(-20px) scale(1.2);
  }

  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const styles = {
  root: css({
    position: "relative",
    "& img": {
      position: "relative",
      zIndex: 1,
      opacity: ".9",
      width: "100%"
    },
    "& svg": {
      position: "absolute",
      zIndex: 2,
      width: "3%",
      color: "#fff",
      "&:nth-child(1)": {
        top: "61%",
        left: "41%",
        animation: `${pop} 1s ease infinite`
      },
      "&:nth-child(2)": {
        top: "60%",
        left: "53%",
        animation: `${pop} 1.4s ease infinite`
      }
    }
  })
};

export default InfluencerIllustration;
