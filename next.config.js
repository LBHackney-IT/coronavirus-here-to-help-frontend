var webpack = require('webpack');

module.exports = {
    reactStrictMode: false,
    distDir: 'build/_next',
    webpack: (config, { isServer }) => {
        config.plugins.push(new webpack.IgnorePlugin({resourceRegExp: /.*\.test\.[jt]s$/}));
        // Fixes npm packages that depend on `fs` module
        if (!isServer) {
          config.resolve.fallback.fs = false;
        }
        return config;
      }
};
