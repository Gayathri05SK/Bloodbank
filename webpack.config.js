const path = require('path');

module.exports = {
  // Other configurations...
  resolve: {
    fallback: {
      "zlib": require.resolve("browserify-zlib"),
      "crypto": require.resolve("crypto-browserify"),
      "querystring": require.resolve("querystring-es3"),
      "path": require.resolve("path-browserify"),
      "stream": require.resolve("stream-browserify"),
      "fs": false // If you don't need to polyfill 'fs'
    }
  }
};
