import ReactLoadable from "react-loadable";
import LoadingScreen from "./LoadingScreen";

const Loadable = opts =>
  ReactLoadable({
    loading: LoadingScreen,
    delay: 100,
    ...opts
  });

export default Loadable;
