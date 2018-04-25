import { ACCESS_TOKEN } from "../../constants";
import {
  FETCH_COUNTIES_AND_DROP_MARKERS,
  ON_COUNTY_CLICK,
  ON_ZOOM_CHANGE,
  ON_MOVE,
  POPULATE_ZIP_CODE_MAP,
  SEARCH_ZIP_CODE,
  SET_INPUT_VALUE
} from "./actions";

export const initialState = {
  inputValue: "",
  activeCounty: {},
  center: [39.8283, -98.5795],
  zoom: 4,
  markerLatLng: null,
  zipcodeToLatLngMap: {},
  validZipcode: true,
  takeBackFilter: false,
  zoomTakeBackFilter: false,
  accessToken: ACCESS_TOKEN,
  counties: [],
  dropMarkers: [],
  fetching: true,
  searching: false
};

export default function(state = initialState, { type, ...action }) {
  switch (type) {
    case FETCH_COUNTIES_AND_DROP_MARKERS:
      return {
        ...state,
        ...action,
        fetching: false
      };
    case POPULATE_ZIP_CODE_MAP:
    case ON_COUNTY_CLICK:
    case ON_ZOOM_CHANGE:
    case ON_MOVE:
    case SEARCH_ZIP_CODE:
    case SET_INPUT_VALUE:
      return {
        ...state,
        ...action
      };
    default:
      return state;
  }
}
