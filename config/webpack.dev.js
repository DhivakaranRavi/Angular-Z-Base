const { resolve } = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval',
  devServer: {
    stats: {
      warnings: false,
    },
  },
});
