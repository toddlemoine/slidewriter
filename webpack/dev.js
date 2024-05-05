const merge = require("webpack-merge");
const common = require("./common.js");

module.exports = merge(common, {
  devtool: "inline-source-map",
  devServer: {
    // historyApiFallback: {
    //   verbose: true
    // },
    contentBase: "../dist/app"
  }
});
