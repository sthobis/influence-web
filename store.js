import axios from "axios";
import produce from "immer";
import jsCookie from "js-cookie";
import Router from "next/router";
import { applyMiddleware, compose, createStore } from "redux";
import CONFIG from "./config";

// initial store state
const initialState = {
  user: null,
  accessToken: null,
  notification: []
};

// action types
const ACTION_TYPE = {
  SET_USER: "SET_USER",
  REMOVE_USER: "REMOVE_USER",
  ADD_NOTIFICATION: "ADD_NOTIFICATION",
  REMOVE_NOTIFICATION: "REMOVE_NOTIFICATION"
};

// redux reducer
const reducer = produce((draft, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_USER:
      draft.user = action.user;
      draft.accessToken = action.accessToken;
      return;
    case ACTION_TYPE.REMOVE_USER:
      draft.user = draft.accessToken = null;
      return;
    case ACTION_TYPE.ADD_NOTIFICATION:
      draft.notification.push(action.notification);
      return;
    case ACTION_TYPE.REMOVE_NOTIFICATION:
      draft.notification.splice(action.index, 1);
      return;
    default:
      return;
  }
}, initialState);

// redux actions start
export function setUser(user, accessToken) {
  // save yser to cookie for next rehydration (server side rendering)
  jsCookie.set(CONFIG.COOKIE.USER, JSON.stringify(user));
  jsCookie.set(CONFIG.COOKIE.ACCESS_TOKEN, accessToken);
  // attach access token to request's authorization header
  // so API will know the request comes from authenticated user
  // this might set server's axios or client's axios
  // based on request (server-side or client-side)
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  return {
    type: ACTION_TYPE.SET_USER,
    user,
    accessToken
  };
}

export function removeUser() {
  // remove state from cookie for next rehydration (server side rendering)
  jsCookie.remove(CONFIG.COOKIE.USER);
  jsCookie.remove(CONFIG.COOKIE.ACCESS_TOKEN);
  // detach access token from request's authorization header
  // so API will know the request comes from unauthenticated user
  // this might set server's axios or client's axios
  // based on request (server-side or client-side)
  delete axios.defaults.headers.common["Authorization"];
  // redirect logged out user to home page
  // this only happen on client side so we can use
  // built-in client-side router
  Router.push("/");
  return {
    type: ACTION_TYPE.REMOVE_USER
  };
}

export function addNotification(notification) {
  return {
    type: ACTION_TYPE.ADD_NOTIFICATION,
    notification
  };
}

export function removeNotification(index) {
  return {
    type: ACTION_TYPE.REMOVE_NOTIFICATION,
    index
  };
}
// redux actions end

const logger = store => dispatch => action => {
  // log every action dispatched to console
  console.log("prev :", store.getState());
  console.log("action :", action, "\n\n");
  return dispatch(action);
};

// middlewares
const middlewares = process.env.NODE_ENV === "development" ? [logger] : [];

// redux store
export default restoredState => {
  return createStore(
    reducer,
    restoredState,
    compose(applyMiddleware(...middlewares))
  );
};
