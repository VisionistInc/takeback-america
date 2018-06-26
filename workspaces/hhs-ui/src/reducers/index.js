import { combineReducers } from "redux";
import map from "./map";
import filters from "./filters";
import panel from "./panel";

const rootReducer = combineReducers({
  map,
  filters,
  panel
});

export default rootReducer;
