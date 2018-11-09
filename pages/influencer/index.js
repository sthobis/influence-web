import { css } from "emotion";
import produce from "immer";
import debounce from "lodash/debounce";
import Router from "next/router";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import InfluencerList from "../../components/InfluencerList";
import KeywordFilter from "../../components/KeywordFilter";
import Layout from "../../components/Layout";
import Localize from "../../components/Localize";
import Paginator from "../../components/Paginator";
import SortFilter from "../../components/SortFilter";
import TagsFilter from "../../components/TagsFilter";
import { addNotification, setLanguage, setUser } from "../../store";
import { getInfluencerList } from "../../utils/api";
import parseCookie from "../../utils/parseCookie";

const initialState = {
  page: 0,
  limit: 12,
  keyword: "",
  tags: [],
  sort: { followersCount: -1 }
};

const parseQuery = (query = {}) => {
  let parsed = {};
  // page in url string is 1 based index
  // set it to 0 based index
  parsed.page = query.page ? parseInt(query.page, 10) - 1 : initialState.page;
  parsed.limit = query.limit ? parseInt(query.limit, 10) : initialState.limit;
  parsed.keyword = query.keyword || "";
  parsed.tags = query.tags ? query.tags.split(",") : initialState.tags;
  parsed.sort = query.sort
    ? JSON.parse(decodeURI(query.sort))
    : initialState.sort;

  return parsed;
};

class InfluencerListPage extends Component {
  static async getInitialProps({ req, res, store, query }) {
    const filter = { ...initialState, ...parseQuery(query) };
    const isDefaultFilter =
      filter.limit === 12 &&
      filter.page === 0 &&
      filter.keyword === "" &&
      filter.tags.length === 0 &&
      filter.sort.followersCount === -1;

    const fetchInfluencerList = async () => {
      try {
        const { influencers, count } = await getInfluencerList(filter);
        return { influencers, count, filter };
      } catch (err) {
        store.dispatch(
          addNotification("Failed to load influencer list, please try again.")
        );
        return { influencers: null, count: 0, filter };
      }
    };

    if (req) {
      // server-rendered
      const { user, accessToken, language } = parseCookie(req.headers.cookie);
      store.dispatch(setLanguage(language));
      if (user) {
        // user is logged in, fetch influencer list
        // and save user session for client rehydration
        store.dispatch(setUser(user, accessToken));
        return fetchInfluencerList();
      } else {
        // user is not logged in
        // if it's a request to sample page, renders it
        // else redirect to login page
        if (isDefaultFilter) {
          return fetchInfluencerList();
        } else {
          const { page, limit, keyword, tags, sort } = filter;
          res.redirect(
            `/login?redirect=/influencer&page=${page +
              1}&limit=${limit}&keyword=${keyword}&tags=${tags.join(
              ","
            )}&sort=${encodeURI(JSON.stringify(sort))}`
          );
        }
      }
    } else {
      // client-rendered
      const { user } = store.getState();
      if (user) {
        // user is logged in, fetch influencer list
        return fetchInfluencerList();
      } else {
        // user is not logged in
        // if it's a request to sample page, renders it
        // else redirect to login page
        if (isDefaultFilter) {
          return fetchInfluencerList();
        } else {
          const { page, limit, keyword, tags, sort } = filter;
          Router.replace(
            `/login?redirect=/influencer&page=${page +
              1}&limit=${limit}&keyword=${keyword}&tags=${tags.join(
              ","
            )}&sort=${encodeURI(JSON.stringify(sort))}`
          );
        }
      }
    }
  }

  state = {
    ...initialState
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ ...nextProps.filter });
  }

  componentDidMount() {
    const {
      filter: { page, limit, keyword, tags, sort }
    } = this.props;
    this.setState({
      page,
      limit,
      keyword,
      tags,
      sort
    });
    this.debouncedRefreshList = debounce(this.refreshList, 500);
  }

  refreshList = async () => {
    const { page, limit, keyword, tags, sort } = this.state;

    Router.push(
      `/influencer?page=${page +
        1}&limit=${limit}&keyword=${keyword}&tags=${tags.join(
        ","
      )}&sort=${encodeURI(JSON.stringify(sort))}`
    );
  };

  setFilter = (key, value) => {
    this.setState(
      produce(draft => {
        draft[key] = value;
        draft.page = 0;
      }),
      () => {
        if (key === "keyword") {
          this.debouncedRefreshList();
        } else {
          this.refreshList();
        }
      }
    );
  };

  goToPage = page => {
    this.setState(
      produce(draft => {
        draft.page = page;
      }),
      this.refreshList
    );
  };

  render() {
    const { influencers, count } = this.props;
    const { limit, page, keyword, tags, sort } = this.state;
    return (
      <Localize selector="pages.influencerIndex">
        {localized => (
          <Layout title={localized[0]}>
            <KeywordFilter keyword={keyword} setFilter={this.setFilter} />
            <div className={styles.filter}>
              <TagsFilter tags={tags} setFilter={this.setFilter} />
              <SortFilter sort={sort} setFilter={this.setFilter} />
            </div>
            {influencers && (
              <>
                <InfluencerList influencers={influencers} />
                <Paginator
                  page={page}
                  limit={limit}
                  count={count}
                  goToPage={this.goToPage}
                />
              </>
            )}
          </Layout>
        )}
      </Localize>
    );
  }
}

const styles = {
  filter: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > *": {
      width: "calc((100% - 25px) / 2)"
    },
    "@media (max-width: 767px)": {
      flexDirection: "column",
      "& > *": {
        width: "100%",
        marginBottom: 25,
        "&:last-child": {
          marginBottom: 0
        }
      }
    }
  })
};

InfluencerListPage.propTypes = {
  influencers: PropTypes.array,
  count: PropTypes.number.isRequired,
  filter: PropTypes.shape({
    page: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    keyword: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    sort: PropTypes.object.isRequired
  }).isRequired
};

export default connect(
  null,
  { addNotification }
)(InfluencerListPage);
