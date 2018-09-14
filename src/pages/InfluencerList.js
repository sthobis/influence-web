import produce from "immer";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import Page from "../components/Page";
import CONFIG from "../config";
import { addNotification } from "../store";
import { getInfluencerList } from "../utils/api";

class InfluencerList extends Component {
  state = {
    influencers: null,
    count: 0,
    limit: 10,
    page: 0,
    fetchStatus: CONFIG.FETCH_STATUS.FETCHING
  };

  componentDidMount() {
    const { page } = this.state;
    this.getInfluencerList(page);
  }

  getInfluencerList = async page => {
    const { addNotification } = this.props;
    const { limit } = this.state;

    try {
      const { influencers, count } = await getInfluencerList({ limit, page });
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

  goToPage = page => {
    this.getInfluencerList(page);
    this.setState(
      produce(draft => {
        draft.page = page;
      })
    );
  };

  render() {
    const { influencers, count, limit, page, fetchStatus } = this.state;
    return (
      <Page className="page-influencer-list" title="Influencer List">
        {fetchStatus === CONFIG.FETCH_STATUS.FINISHED ? (
          <div>
            {influencers && influencers.length ? (
              influencers.map(influencer => (
                <Link
                  to={`/influencer/${influencer.instagramHandle}`}
                  key={influencer._id}
                >
                  <p>{influencer.instagramHandle}</p>
                </Link>
              ))
            ) : (
              <p>It's empty</p>
            )}
            <p>
              Showing {influencers.length} of {count} influencers.
            </p>
            <button
              disabled={page === 0}
              onClick={() => this.goToPage(page - 1)}
            >
              Prev
            </button>
            <button
              disabled={page === Math.ceil(count / limit) - 1}
              onClick={() => this.goToPage(page + 1)}
            >
              Next
            </button>
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
)(InfluencerList);
