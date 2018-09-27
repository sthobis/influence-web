import { css } from "emotion";
import PropTypes from "prop-types";
import React from "react";

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
        {"<<"}
      </button>
      <button
        className={styles.button}
        disabled={page === firstPage}
        onClick={() => goToPage(page - 1)}
      >
        {"<"}
      </button>
      {Array(5)
        .fill(null)
        .map((n, i) => {
          const pageIndex = page - (page % 5) + i;
          if (pageIndex > lastPage) return null;
          return (
            <button
              className={styles.button}
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
        {">"}
      </button>
      <button
        className={styles.button}
        disabled={page === lastPage}
        onClick={() => goToPage(lastPage)}
      >
        {">>"}
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
    cursor: "pointer",
    display: "block",
    margin: "0 5px",
    padding: 5,
    background: "transparent",
    border: "none",
    fontWeight: 700,
    fontSize: 16
  })
};

Paginator.propTypes = {
  page: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  goToPage: PropTypes.func.isRequired
};

export default Paginator;
