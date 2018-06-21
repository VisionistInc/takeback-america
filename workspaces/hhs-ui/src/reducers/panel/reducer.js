import {
  TOGGLE_INFO_PANEL
} from "./actions";

export const initialState = {
  panelOpen: true
};

export default function(state = initialState, { type, ...action }) {
  switch (type) {
    case TOGGLE_INFO_PANEL:
      return {
        ...state,
        ...action
      }
    default:
      return state;
  }
}
