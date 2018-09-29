export default {
  API_BASE_URL: {
    development: "http://localhost:3101",
    test: "http://localhost:3101",
    production: "http://localhost:3101"
  },
  FETCH_STATUS: {
    FETCHING: "FETCHING",
    FINISHED: "FINISHED"
  },
  COOKIE: {
    USER: "__influence_user",
    ACCESS_TOKEN: "__influence_access_token"
  },
  GROUP: {
    ADVERTISER: "advertiser",
    INFLUENCER: "influencer",
    SUPER_ADMIN: "super_admin",
    STAFF_ADMIN: "staff_admin"
  },
  TAGS_FILTER_OPTIONS: ["general", "food", "comedy"],
  SORT_FILTER_OPTIONS: [
    { label: "Followers high to low", value: { followersCount: -1 } },
    { label: "Followers low to high", value: { followersCount: 1 } },
    {
      label: "Post endorse pricing high to low",
      value: { "endorsePricing.post": -1, followersCount: -1 }
    },
    {
      label: "Post endorse pricing low to high",
      value: { "endorsePricing.post": 1, followersCount: -1 }
    },
    {
      label: "Story endorse pricing high to low",
      value: { "endorsePricing.story": -1, followersCount: -1 }
    },
    {
      label: "Story endorse pricing low to high",
      value: { "endorsePricing.story": 1, followersCount: -1 }
    }
  ]
};
