import produce from "immer";
import debounce from "lodash/debounce";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfluencerList from "../components/InfluencerList";
import Layout from "../components/Layout";
import Paginator from "../components/Paginator";
import SearchFilter from "../components/SearchFilter";
import CONFIG from "../config";
import { addNotification, setUser } from "../store";
import { getInfluencerList } from "../utils/api";
import parseUserFromCookie from "../utils/parseUserFromCookie";

const initialState = {
  limit: 9,
  page: 0,
  keyword: ""
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
    this.setState({ ...query });
    this.setFilter = debounce(this.setFilter, 500);
  }

  getInfluencerList = async () => {
    const { addNotification } = this.props;
    const { page, limit, keyword } = this.state;

    try {
      const { influencers, count } = await getInfluencerList({
        limit,
        page,
        keyword
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

  setFilter = keyword => {
    this.setState(
      produce(draft => {
        draft.keyword = keyword;
      }),
      this.getInfluencerList
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
    const { influencers, count, limit, page, keyword } = this.state;
    return (
      <Layout className="page-influencer-list" title="Influencer List">
        <div>
          <SearchFilter keyword={keyword} setFilter={this.setFilter} />
          {influencers && <InfluencerList influencers={influencers} />}
          <Paginator
            page={page}
            limit={limit}
            count={count}
            goToPage={this.goToPage}
          />
        </div>
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
