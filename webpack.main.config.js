module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main.js',
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
  externals: {
    'better-sqlite3': 'commonjs better-sqlite3'
  },
  node: {
    __dirname: false,
    __filename: false,
  },
};
