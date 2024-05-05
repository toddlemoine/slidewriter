const merge = require("webpack-merge");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");
const common = require("./common.js");

module.exports = merge(common, {
  plugins: [new webpack.EnvironmentPlugin(["NODE_ENV"]), new UglifyJSPlugin()]
});
