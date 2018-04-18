const getWebpackConfig = () => {
  switch (process.env.npm_lifecycle_event) {
    case "start":
      return require("./webpack.config.dev");
    default:
      return require("./webpack.config.prod");
  }
};

module.exports = getWebpackConfig();
