const objectToQuery = (obj) =>
  (Object.keys(obj).length > 0 ? "?" : "") +
  Object.keys(obj)
    .map((key) => key + "=" + obj[key])
    .join("&");

module.exports = {
  objectToQuery,
};
