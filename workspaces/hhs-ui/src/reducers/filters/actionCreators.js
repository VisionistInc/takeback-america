
import {
  TOGGLE_FILTERS,
  SET_SCORE_FILTER
} from "./actions";

export const toggleFilters = isOpen => async dispatch => {
  return dispatch({
    type: TOGGLE_FILTERS,
    filtersOpen: isOpen
  });
};

export const setScoreFilter = (range) => async dispatch => {
  return dispatch({
    type: SET_SCORE_FILTER,
    scoreFilter: range
  })
}