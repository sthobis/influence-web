import { css } from "emotion";
import produce from "immer";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { FaTimes } from "react-icons/fa";
import { connect } from "react-redux";
import { removeNotification } from "../store";

class NotificationItem extends Component {
  state = {
    className: styles.notification
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState(
        produce(draft => {
          draft.className += ` ${styles.fadeIn}`;
        })
      );
    }, 100);
  }

  close = () => {
    const { close } = this.props;
    this.setState(
      produce(draft => {
        draft.className = styles.notification;
      }),
      () => {
        setTimeout(close, 310);
      }
    );
  };

  render() {
    const { text } = this.props;
    const { className } = this.state;
    return (
      <li className={className}>
        <span>{text}</span>
        <button onClick={this.close} className={styles.button}>
          <FaTimes />
        </button>
      </li>
    );
  }
}

const NotificationList = ({ notifications, removeNotification }) => {
  if (!notifications.length) return null;
  return (
    <ul className={styles.list}>
      {notifications.map((notification, i) => (
        <NotificationItem
          key={notification.id}
          text={notification.text}
          close={() => removeNotification(i)}
        />
      ))}
    </ul>
  );
};

const styles = {
  list: css({
    position: "fixed",
    right: 50,
    bottom: 50,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    margin: 0,
    padding: 0,
    listStyleType: "none"
  }),
  notification: css({
    position: "relative",
    width: "auto",
    maxWidth: 600,
    borderRadius: 5,
    boxShadow: "0 0 20px rgba(134, 59, 82, 0.5)",
    padding: "10px 40px 10px 15px",
    backgroundColor: "#FC427B",
    fontSize: 15,
    fontWeight: 700,
    color: "#fff",
    opacity: 0,
    transition: ".3s",
    transform: "translateX(100px) scale(0.5)",
    "& + &": {
      marginTop: 20
    }
  }),
  fadeIn: css({
    opacity: 1,
    transform: "translateX(0) scale(1)"
  }),
  button: css({
    position: "absolute",
    top: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    background: "transparent",
    border: "none",
    cursor: "pointer",
    "& svg": {
      color: "#fff"
    }
  })
};

NotificationList.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })
  ).isRequired,
  removeNotification: PropTypes.func.isRequired
};

const stateToProps = ({ notifications }) => ({ notifications });

export default connect(
  stateToProps,
  { removeNotification }
)(NotificationList);
