import { connect } from "react-redux";
import { debounce } from "lodash";
import {
  fetchCountiesAndDropMarkers,
  onZoomChange,
  onCountyClick,
  onMove
} from "../../reducers/map";
import MapContainer from "./MapContainer";

const mapStateToProps = ({ map }) => {
  return { ...map };
};

const dispatchProps = {
  fetchCountiesAndDropMarkers,
  onZoomChange,
  onCountyClick,
  onMove
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
