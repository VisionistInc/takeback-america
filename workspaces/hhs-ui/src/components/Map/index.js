import { connect } from "react-redux";
import { debounce } from "lodash";
import {
  fetchCountiesAndDropMarkers,
  onZoomChange,
  onCountyClick,
  onMove
} from "../../reducers/map";

import { togglePanel } from "../../reducers/panel";
import MapContainer from "./MapContainer";

const mapStateToProps = ({ map, panel }) => ({ ...map, ...panel });

const dispatchProps = {
  fetchCountiesAndDropMarkers,
  onZoomChange,
  onCountyClick,
  onMove,
  togglePanel
};

const mergeProps = (stateProps, { onMove, ...dispatchProps }, ownProps) => {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    onMove: debounce(onMove, 250)
  };
};

export default connect(mapStateToProps, dispatchProps, mergeProps)(
  MapContainer
);
