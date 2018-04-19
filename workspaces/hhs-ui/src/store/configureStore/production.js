import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "../../reducers";
import middleware from "../middleware";

const store = createStore(rootReducer, compose(applyMiddleware(...middleware)));

export default store;
