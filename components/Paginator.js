import { css, cx } from "emotion";
import PropTypes from "prop-types";
import React from "react";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight
} from "react-icons/fa";

const Paginator = ({ page, limit, count, goToPage }) => {
  const firstPage = 0;
  const lastPage = Math.ceil(count / limit) - 1;

  return (
    <div className={styles.root}>
      <button
        className={styles.button}
        disabled={page === firstPage}
        onClick={() => goToPage(firstPage)}
      >
        <FaAngleDoubleLeft />
      </button>
      <button
        className={styles.button}
        disabled={page === firstPage}
        onClick={() => goToPage(page - 1)}
      >
        <FaAngleLeft />
      </button>
      {Array(5)
        .fill(null)
        .map((n, i) => {
          const pageIndex = page - (page % 5) + i;
          if (pageIndex > lastPage) return null;
          return (
            <button
              className={cx(styles.button, {
                [styles.currentPage]: pageIndex === page
              })}
              key={pageIndex}
              disabled={pageIndex === page}
              onClick={() => goToPage(pageIndex)}
            >
              {pageIndex + 1}
            </button>
          );
        })}
      <button
        className={styles.button}
        disabled={page === lastPage}
        onClick={() => goToPage(page + 1)}
      >
        <FaAngleRight />
      </button>
      <button
        className={styles.button}
        disabled={page === lastPage}
        onClick={() => goToPage(lastPage)}
      >
        <FaAngleDoubleRight />
      </button>
    </div>
  );
};

const styles = {
  root: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 0 50px 0"
  }),
  button: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 42,
    height: 36,
    margin: "0 5px",
    border: "none",
    borderRadius: 3,
    fontWeight: 700,
    fontSize: 13,
    background: "#2e3040",
    color: "#fff",
    cursor: "pointer",
    "&:disabled": {
      cursor: "default"
    }
  }),
  currentPage: css({
    position: "relative",
    "&::before": {
      content: "''",
      position: "absolute",
      top: 1,
      right: 1,
      bottom: 1,
      left: 1,
      border: "1px dashed #fff",
      borderRadius: 3
    }
  })
};

Paginator.propTypes = {
  page: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  goToPage: PropTypes.func.isRequired
};

export default Paginator;
