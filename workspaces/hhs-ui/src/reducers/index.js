import { combineReducers } from "redux";
import map from "./map";
import panel from "./panel";

const rootReducer = combineReducers({
  map,
  panel
});

export default rootReducer;
