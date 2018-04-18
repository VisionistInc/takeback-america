const DEVELOPMENT = "development";
const TEST = "test";

const presets = [
  [
    require.resolve("babel-preset-env"),
    {
      targets: {
        browsers: ["chrome > 48", "firefox > 30"]
      },
      useBuiltIns: "usage",
      modules: process.env.NODE_ENV === TEST ? "commonjs" : false
    }
  ],
  require.resolve("babel-preset-react")
];

const plugins = [
  require.resolve("babel-plugin-transform-class-properties"),
  require.resolve("babel-plugin-transform-object-rest-spread"),
  require.resolve("babel-plugin-lodash")
];

module.exports = {
  presets,
  plugins:
    process.env.NODE_ENV === DEVELOPMENT
      ? [require.resolve("react-hot-loader/babel"), ...plugins]
      : plugins
};
