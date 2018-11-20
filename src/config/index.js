// @ts-check

/**
 * @param {import('./types').EnvironmentConfig} development
 */
const development = require('./dev');

/**
 * @param {import('./types').EnvironmentConfig} production
 */
const production = require('./prod');


/**
 * @param {import('./types').Config} production
 */
const config = {
  development,
  production
}

module.exports = config;