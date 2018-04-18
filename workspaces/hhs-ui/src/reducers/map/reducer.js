import { SET_NAME } from "./actions";

export const initialState = {
  activeCounty: {},
  center: [39.8283, -98.5795],
  zoom: 4,
  zipcodeToLatLngMap: {},
  validZipcode: true,
  takeBackFilter: false,
  zoomTakeBackFilter: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_NAME:
      return action.name;
    default:
      return state;
  }
}
