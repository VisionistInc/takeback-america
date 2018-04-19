import { ACCESS_TOKEN } from "../../constants";
import { FETCH_COUNTIES_AND_DROP_MARKERS } from "./actions";

export const initialState = {
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
  fetching: true
};

export default function(state = initialState, { type, ...action }) {
  switch (type) {
    case FETCH_COUNTIES_AND_DROP_MARKERS: {
      return {
        ...state,
        ...action,
        fetching: false
      };
    }
    default:
      return state;
  }
}
