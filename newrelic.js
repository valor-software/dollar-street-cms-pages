'use strict';

/* eslint-disable */
const defaultEnv = 'development';
const env = process.env.NODE_ENV || defaultEnv;
const key = '5defb3ed4138f66b2007eb272fae828476afdfa5';

const configs = {
  development: {
    name: 'local.dollarstreet.org',
    key: key
  },
  staging: {
    name: 'stage.dollarstreet.org',
    key: key
  },
  production: {
    name: 'www.gapminder.org',
    key: key
  }
};

const config = configs[env] || configs[defaultEnv];

/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {
  app_name: [config.name],
  license_key: config.key,
  logging: {level: 'info'}
};
/* eslint-enable */
