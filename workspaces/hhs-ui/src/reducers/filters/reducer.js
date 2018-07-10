import {
  TOGGLE_FILTERS, 
  SET_SCORE_FILTER,
} from "./actions";

export const initialState = {
  filtersOpen: false,
  scoreFilter: [0,1]
};

export default function(state = initialState, { type, ...action }) {
  switch (type) {
    case TOGGLE_FILTERS:
    case SET_SCORE_FILTER:
      return {
        ...state,
        ...action
      };
    default:
      return state;
  }
}
