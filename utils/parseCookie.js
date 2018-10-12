import atob from "atob";
import cookie from "cookie";
import CONFIG from "../config";

export default cookies => {
  let language = CONFIG.LANGUAGE.ID;
  if (typeof cookies === "string") {
    const cookiesJson = cookie.parse(cookies);
    if (cookiesJson[CONFIG.COOKIE.LANGUAGE]) {
      language = cookiesJson[CONFIG.COOKIE.LANGUAGE];
    }
    if (cookiesJson[CONFIG.COOKIE.USER]) {
      // user was previously logged in
      const user = JSON.parse(cookiesJson[CONFIG.COOKIE.USER]);
      const accessToken = cookiesJson[CONFIG.COOKIE.ACCESS_TOKEN];

      const base64Url = accessToken.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(atob(base64));

      const now = new Date().getTime();
      if (now > payload.exp) {
        // accessToken has not expired and is still valid
        return { user, accessToken, language };
      }
    }
  }
  return { user: null, accessToken: null, language };
};
