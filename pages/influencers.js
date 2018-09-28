import produce from "immer";
import debounce from "lodash/debounce";
import Router from "next/router";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfluencerList from "../components/InfluencerList";
import KeywordFilter from "../components/KeywordFilter";
import Layout from "../components/Layout";
import Paginator from "../components/Paginator";
import TagFilter from "../components/TagFilter";
import { addNotification, setUser } from "../store";
import { getInfluencerList } from "../utils/api";
import parseUserFromCookie from "../utils/parseUserFromCookie";

const initialState = {
  limit: 9,
  page: 0,
  keyword: "",
  tags: []
};

const parseQuery = (query = {}) => {
  const formatted = { ...query };
  if (formatted.page) {
    // page in url string is 1 based index
    // set it to 0 based index
    formatted.page = parseInt(formatted.page, 10) - 1;
  }
  if (formatted.limit) {
    formatted.limit = parseInt(formatted.limit, 10);
  }
  if (formatted.tags) {
    formatted.tags = formatted.tags.split(",");
  } else {
    formatted.tags = initialState.tags;
  }
  return formatted;
};

class Influencers extends Component {
  static async getInitialProps({ req, res, store, query }) {
    const filter = { ...initialState, ...parseQuery(query) };
    if (req) {
      // server-rendered
      const { user, accessToken } = parseUserFromCookie(req.headers.cookie);
      if (user) {
        // user is logged in, fetch influencer list
        // and save user session for client rehydration
        store.dispatch(setUser(user, accessToken));
        try {
          const { influencers, count } = await getInfluencerList(filter);
          return { influencers, count, filter };
        } catch (err) {
          store.dispatch(
            addNotification("Failed to load influencer list, please try again.")
          );
          return { influencers: null, count: 0, filter };
        }
      } else {
        // user is not logged in
        // redirect to login page
        res.redirect("/login");
      }
    } else {
      // client-rendered
      const { user } = store.getState();
      if (user) {
        // user is logged in, fetch influencer list
        try {
          const { influencers, count } = await getInfluencerList(filter);
          return { influencers, count, filter };
        } catch (err) {
          store.dispatch(
            addNotification("Failed to load influencer list, please try again.")
          );
          return { influencers: null, count: 0, filter };
        }
      } else {
        // user is not logged in
        // redirect to login page
        Router.replace("/login");
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
    const { filter } = this.props;
    this.setState({ ...filter });
    this.debouncedRefreshList = debounce(this.refreshList, 500);
  }

  refreshList = async () => {
    const { page, limit, keyword, tags } = this.state;

    Router.push(
      `/influencers?page=${page +
        1}&limit=${limit}&keyword=${keyword}&tags=${tags.join(",")}`
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
    const { limit, page, keyword, tags } = this.state;
    return (
      <Layout title="Top Influencers in Indonesia">
        <KeywordFilter keyword={keyword} setFilter={this.setFilter} />
        <div>
          <TagFilter tags={tags} setFilter={this.setFilter} />
        </div>
        {influencers && <InfluencerList influencers={influencers} />}
        <Paginator
          page={page}
          limit={limit}
          count={count}
          goToPage={this.goToPage}
        />
      </Layout>
    );
  }
}

const dispatchToProps = dispatch => ({
  addNotification: bindActionCreators(addNotification, dispatch)
});

export default connect(
  null,
  dispatchToProps
)(Influencers);
