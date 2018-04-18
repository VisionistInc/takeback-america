import { createStore, compose, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";
import rootReducer from "../../reducers";
import middleware from "../middleware";

const persistConfig = {
  key: "root",
  storage: sessionStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  compose(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);

export default store;
