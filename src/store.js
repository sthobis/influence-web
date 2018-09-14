import axios from "axios";
import produce from "immer";
import { applyMiddleware, compose, createStore } from "redux";
import CONFIG from "./config";

// rehydrate initial state from localStorage data (if any)
let accessToken =
  localStorage.getItem(CONFIG.LOCAL_STORAGE_KEY.ACCESS_TOKEN) || null;
let user =
  JSON.parse(localStorage.getItem(CONFIG.LOCAL_STORAGE_KEY.USER)) || null;

// check whether access token is still valid (has not expired)
try {
  const base64Url = accessToken.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const payload = JSON.parse(window.atob(base64));
  console.log(payload);
} catch (err) {
  accessToken = user = null;
}
const initialState = { user: { name: "Thobi" }, accessToken, notification: [] };

// if there's an active accessToken (user session is still valid)
// set it to authorization header for next outgoing requests
// so API will know the request comes from authenticated user
if (accessToken) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
}

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
  // save state to local storage for next rehydration
  localStorage.setItem(CONFIG.LOCAL_STORAGE_KEY.USER, JSON.stringify(user));
  localStorage.setItem(CONFIG.LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken);
  // attach access token to request's authorization header
  // so API will know the request comes from authenticated user
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  return {
    type: ACTION_TYPE.SET_USER,
    user,
    accessToken
  };
}

export function removeUser() {
  // remove state from local storage for next rehydration
  localStorage.removeItem(CONFIG.LOCAL_STORAGE_KEY.USER);
  localStorage.removeItem(CONFIG.LOCAL_STORAGE_KEY.ACCESS_TOKEN);
  // detach access token from request's authorization header
  // so API will know the request comes from unauthenticated user
  delete axios.defaults.headers.common["Authorization"];
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

const logger = store => next => action => {
  // log every action dispatched to console
  const { type, ...payload } = action;
  console.log("DISPATCH :", type);
  console.log(payload);
  let result = next(action);
  return result;
};

// middlewares
const middlewares = process.env.NODE_ENV === "development" ? [logger] : [];

// redux store
export default createStore(
  reducer,
  initialState,
  compose(applyMiddleware(...middlewares))
);
