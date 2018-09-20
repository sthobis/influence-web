import produce from "immer";
import debounce from "lodash/debounce";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfluencerList from "../components/InfluencerList";
import Page from "../components/Page";
import Paginator from "../components/Paginator";
import SearchFilter from "../components/SearchFilter";
import CONFIG from "../config";
import { addNotification } from "../store";
import { getInfluencerList } from "../utils/api";

class InfluencerListPage extends Component {
  state = {
    influencers: null,
    count: 0,
    limit: 9,
    page: 0,
    keyword: "",
    fetchStatus: CONFIG.FETCH_STATUS.FETCHING
  };

  componentDidMount() {
    const { page } = this.state;
    this.getInfluencerList(page);
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
    const { influencers, count, limit, page, fetchStatus } = this.state;
    return (
      <Page className="page-influencer-list" title="Influencer List">
        {fetchStatus === CONFIG.FETCH_STATUS.FINISHED ? (
          <div>
            <SearchFilter setFilter={this.setFilter} />
            {influencers && <InfluencerList influencers={influencers} />}
            <Paginator
              page={page}
              limit={limit}
              count={count}
              goToPage={this.goToPage}
            />
          </div>
        ) : (
          "Loading.."
        )}
      </Page>
    );
  }
}

const dispatchToProps = dispatch => ({
  addNotification: bindActionCreators(addNotification, dispatch)
});

export default connect(
  null,
  dispatchToProps
)(InfluencerListPage);
