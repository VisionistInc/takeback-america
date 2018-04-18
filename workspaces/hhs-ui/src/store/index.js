const getStoreConfiguration = () => {
  return require(`./configureStore/${process.env.NODE_ENV}`);
};

module.exports = getStoreConfiguration();
