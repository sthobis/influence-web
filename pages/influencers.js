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
import CONFIG from "../config";
import { addNotification, setUser } from "../store";
import { getInfluencerList } from "../utils/api";
import parseUserFromCookie from "../utils/parseUserFromCookie";

const initialState = {
  limit: 9,
  page: 0,
  keyword: "",
  tags: []
};

class Influencers extends Component {
  static async getInitialProps({ req, res, store, query }) {
    if (query.page) {
      // page in url string 1 based index
      // set it to 0 based index
      query.page = parseInt(query.page) - 1;
    }
    const filter = { ...initialState, ...query };
    if (req) {
      // server-rendered
      const { user, accessToken } = parseUserFromCookie(req.headers.cookie);
      if (user) {
        // user is logged in, fetch influencer list
        // and save user session for client rehydration
        store.dispatch(setUser(user, accessToken));
        try {
          const { influencers, count } = await getInfluencerList(filter);
          return { influencers, count, query };
        } catch (err) {
          store.dispatch(
            addNotification("Failed to load influencer list, please try again.")
          );
          return { influencers: null, count: 0, query };
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
          return { influencers, count, query };
        } catch (err) {
          store.dispatch(
            addNotification("Failed to load influencer list, please try again.")
          );
          return { influencers: null, count: 0, query };
        }
      } else {
        // user is not logged in
        // redirect to login page
        Router.replace("/login");
      }
    }
  }

  state = {
    ...initialState,
    influencers: this.props.influencers,
    count: this.props.count
  };

  componentDidMount() {
    const { query } = this.props;
    if (query.page) {
      query.page = parseInt(query.page, 10);
    }
    if (query.limit) {
      query.limit = parseInt(query.limit, 10);
    }
    if (query.tags) {
      query.tags = query.tags.split(",");
    } else {
      query.tags = initialState.tags;
    }
    this.setState({ ...query });
    this.debouncedGetInfluencerList = debounce(this.getInfluencerList, 500);
  }

  getInfluencerList = async () => {
    const { addNotification } = this.props;
    const { page, limit, keyword, tags } = this.state;

    Router.push(
      `/influencers?page=${page +
        1}&limit=${limit}&keyword=${keyword}&tags=${tags.join(",")}`,
      `/influencers?page=${page +
        1}&limit=${limit}&keyword=${keyword}&tags=${tags.join(",")}`,
      { shallow: true }
    );
    try {
      const { influencers, count } = await getInfluencerList({
        limit,
        page,
        keyword,
        tags
      });
      this.setState(
        produce(draft => {
          draft.influencers = influencers;
          draft.count = count;
          draft.fetchStatus = CONFIG.FETCH_STATUS.FINISHED;
        })
      );
    } catch (err) {
      addNotification("Failed to load influencer list. Please try again.");
      this.setState(
        produce(draft => {
          draft.fetchStatus = CONFIG.FETCH_STATUS.FINISHED;
        })
      );
    }
  };

  setFilter = (key, value) => {
    this.setState(
      produce(draft => {
        draft[key] = value;
        draft.page = 0;
      }),
      this.debouncedGetInfluencerList
    );
  };

  goToPage = page => {
    this.setState(
      produce(draft => {
        draft.page = page;
      }),
      this.getInfluencerList
    );
  };

  render() {
    const { influencers, count, limit, page, keyword, tags } = this.state;
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
