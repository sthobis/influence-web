import { css, keyframes } from "emotion";
import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const AdvertiserIllustration = () => (
  <div className={styles.root}>
    <FaMapMarkerAlt />
    <FaMapMarkerAlt />
    <FaMapMarkerAlt />
    <img src="/static/images/section-2-advertiser.svg" alt="advertiser" />
  </div>
);

const blink = keyframes`
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

const styles = {
  root: css({
    position: "relative",
    "& img": {
      width: "100%"
    },
    "& svg": {
      position: "absolute",
      width: "2.5%",
      color: "#efd8a3",
      "&:nth-child(1)": {
        top: "47%",
        left: "74%",
        animation: `${blink} 1s ease infinite`
      },
      "&:nth-child(2)": {
        top: "37%",
        left: "34%",
        animation: `${blink} 2.3s ease infinite`
      },
      "&:nth-child(3)": {
        top: "32%",
        left: "64%",
        animation: `${blink} 1.4s ease infinite`
      }
    }
  })
};

export default AdvertiserIllustration;
