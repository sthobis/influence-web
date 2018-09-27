export default follower => {
  const hundredMillion = 100000000;
  const million = 1000000;
  const thousand = 1000;

  if (follower >= hundredMillion) {
    return `${(follower / million).toFixed(0)}m`.replace(".0", "");
  }

  if (follower >= million) {
    return `${(follower / million).toFixed(1)}m`.replace(".0", "");
  } else if (follower >= thousand) {
    return `${(follower / thousand).toFixed(1)}k`.replace(".0", "");
  } else {
    return follower;
  }
};
