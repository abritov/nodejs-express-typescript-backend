// @ts-check

/**
 * @param {import('./types').IEnvironmentConfig} development
 */
const development = require("./dev");

/**
 * @param {import('./types').IEnvironmentConfig} production
 */
const production = require("./prod");

/**
 * @param {import('./types').IConfig} production
 */
const config = {
  development,
  production
};

module.exports = config;
