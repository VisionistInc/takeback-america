import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import App from "./components";
import store, { persistor } from "./store";

const render = (Component: ReactClass<any>) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <PersistGate loading="Loading..." persistor={persistor}>
          <Component />
        </PersistGate>
      </Provider>
    </AppContainer>,
    document.getElementById("root")
  );
};

render(App);

if (module.hot) {
  module.hot.accept("./components/", () => {
    render(App);
  });
}
