module.exports = {
  development: require("../config/dev").db,
  production: require("../config/prod").db
};
