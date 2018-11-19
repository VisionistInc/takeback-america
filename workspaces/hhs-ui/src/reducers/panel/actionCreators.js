import { TOGGLE_INFO_PANEL } from "./actions";

export const togglePanel = panelOpen => dispatch => {
  dispatch({
    type: TOGGLE_INFO_PANEL,
    panelOpen: panelOpen
  })
};
