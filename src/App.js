import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Loadable from "./components/Loadable";

const AsyncHome = Loadable({
  loader: () => import(/* webpackChunkName: "home" */ "./pages/Home")
});
const AsyncInfluencerDetail = Loadable({
  loader: () =>
    import(/* webpackChunkName: "influencer-detail" */ "./pages/InfluencerDetail")
});
const AsyncInfluencerList = Loadable({
  loader: () =>
    import(/* webpackChunkName: "influencer-list" */ "./pages/InfluencerList")
});
const AsyncNotFound = Loadable({
  loader: () => import(/* webpackChunkName: "not-found" */ "./pages/NotFound")
});

const App = ({ user }) => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={AsyncHome} />
      <Route
        exact
        path="/influencer"
        render={props =>
          user ? <AsyncInfluencerList {...props} /> : <AsyncNotFound />
        }
      />
      <Route
        exact
        path="/influencer/:username"
        render={props =>
          user ? <AsyncInfluencerDetail {...props} /> : <AsyncNotFound />
        }
      />
      <Route component={AsyncNotFound} />
    </Switch>
  </BrowserRouter>
);

const stateToProps = ({ user }) => ({ user });

export default connect(stateToProps)(App);
