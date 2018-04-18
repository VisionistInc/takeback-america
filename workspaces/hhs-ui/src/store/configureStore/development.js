import store from "./production";

if (module.hot) {
  module.hot.accept("../../reducers", () =>
    store.replaceReducer(require("../../reducers"))
  );
}

export { persistor } from "./production";

export default store;
