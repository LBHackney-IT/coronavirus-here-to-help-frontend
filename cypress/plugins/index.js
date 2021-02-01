/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

module.exports = (on, config) => {
    // copy any needed variables from process.env to config.env
    config.env.HACKNEY_JWT_SECRET = 'sekret';
    config.env.NEXT_PUBLIC_HACKNEY_COOKIE_NAME = 'hackneyToken';
    config.env.NEXT_PUBLIC_CALL_HANDLERS = 'Person A,Person B,Person C,Person D';

    // do not forget to return the changed config object!
    return config;
};
