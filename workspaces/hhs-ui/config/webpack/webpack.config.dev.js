var webpack = require("webpack");
var path = require("path");
var webpackConfig = require("./webpack.config");

const LOCALHOST = "0.0.0.0";
const PORT_NUMBER = 3003;
const ROOT = process.cwd();

const devServer = {
  hot: true,
  host: LOCALHOST,
  contentBase: path.resolve(ROOT, "dist"),
  publicPath: "/",
  stats: { colors: true },
  proxy: {
    "/api": {
      target: `http://${LOCALHOST}:${PORT_NUMBER}/`,
      pathRewrite: { "^/": "" }
    }
  }
};

module.exports = Object.assign({}, webpackConfig, {
  entry: {
    bundle: [
      webpackConfig.entry.bundle[0],
      "react-hot-loader/patch",
      "webpack/hot/only-dev-server"
    ].concat(webpackConfig.entry.bundle.slice(1))
  },
  devtool: "source-map",
  devServer,
  plugins: webpackConfig.plugins.concat([
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]),
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        include: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
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
      }
    ].concat(webpackConfig.module.rules)
  }
});
