export default {
  BASE_URL: {
    development: "http://localhost:3100",
    test: "http://localhost:3100",
    production: "https://igfluencer.id"
  },
  API_BASE_URL: {
    development: "http://localhost:3101",
    test: "http://localhost:3101",
    production: "https://api.igfluencer.id"
  },
  FETCH_STATUS: {
    FETCHING: "FETCHING",
    FINISHED: "FINISHED"
  },
  COOKIE: {
    USER: "__influence_user",
    ACCESS_TOKEN: "__influence_access_token",
    LANGUAGE: "__influence_language"
  },
  GROUP: {
    ADVERTISER: "advertiser",
    INFLUENCER: "influencer",
    SUPER_ADMIN: "super_admin",
    STAFF_ADMIN: "staff_admin"
  },
  LANGUAGE: {
    // IETF language tag
    US: "EN",
    ID: "ID"
  },
  TAGS_FILTER_OPTIONS: [
    "Acting",
    "Arts",
    "Automotive",
    "Beauty",
    "Cinema",
    "Comedy",
    "Comicbooks",
    "DIY and Crafts",
    "Entrepreneur",
    "Fashion",
    "Fitness",
    "Food",
    "Gaming",
    "Health",
    "Home and Garden",
    "Kids and Parenting",
    "Lifestyle",
    "Model",
    "Motivational",
    "Music",
    "Nature",
    "Nutrition",
    "Pets",
    "Photography",
    "Running",
    "Spirituality",
    "Sports",
    "Travel",
    "TV and Media",
    "Wedding"
  ],
  SORT_FILTER_OPTIONS: [
    { label: "Followers high to low", value: { followersCount: -1 } },
    { label: "Followers low to high", value: { followersCount: 1 } }
    // {
    //   label: "Post endorse pricing high to low",
    //   value: { "endorsePricing.post": -1, followersCount: -1 }
    // },
    // {
    //   label: "Post endorse pricing low to high",
    //   value: { "endorsePricing.post": 1, followersCount: -1 }
    // },
    // {
    //   label: "Story endorse pricing high to low",
    //   value: { "endorsePricing.story": -1, followersCount: -1 }
    // },
    // {
    //   label: "Story endorse pricing low to high",
    //   value: { "endorsePricing.story": 1, followersCount: -1 }
    // }
  ]
};
