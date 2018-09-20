import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Loadable from "./components/Loadable";

const AsyncHomePage = Loadable({
  loader: () => import(/* webpackChunkName: "home" */ "./pages/HomePage")
});
const AsyncInfluencerDetailPage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "influencer-detail" */ "./pages/InfluencerDetailPage")
});
const AsyncInfluencerListPage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "influencer-list" */ "./pages/InfluencerListPage")
});
const AsyncNotFoundPage = Loadable({
  loader: () =>
    import(/* webpackChunkName: "not-found" */ "./pages/NotFoundPage")
});

const App = ({ user }) => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={AsyncHomePage} />
      <Route
        exact
        path="/influencer"
        render={props =>
          user ? <AsyncInfluencerListPage {...props} /> : <AsyncNotFoundPage />
        }
      />
      <Route
        exact
        path="/influencer/:username"
        render={props =>
          user ? (
            <AsyncInfluencerDetailPage {...props} />
          ) : (
            <AsyncNotFoundPage />
          )
        }
      />
      <Route component={AsyncNotFoundPage} />
    </Switch>
  </BrowserRouter>
);

const stateToProps = ({ user }) => ({ user });

export default connect(stateToProps)(App);
