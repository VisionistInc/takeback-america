const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpackConfig = require("./webpack.config");

const ROOT = process.cwd();

module.exports = Object.assign({}, webpackConfig, {
  plugins: webpackConfig.plugins.concat([
    new ExtractTextPlugin("styles.css"),
    new UglifyJsPlugin({
      parallel: true
    })
  ]),
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        include: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true,
                importLoaders: 2,
                sourceMap: true,
                localIdentName: "[name]__[local]__[hash:base64:8]"
              }
            },
            {
              loader: "postcss-loader",
              options: {
                config: {
                  path: path.resolve(ROOT, "config/postcss.config.js")
                }
              }
            },
            "sass-loader"
          ]
        })
      }
    ].concat(webpackConfig.module.rules)
  }
});
