import { connect } from "react-redux";
import InfoPanel from "./InfoPanel";
import { togglePanel } from "../../reducers/panel";
import { clearCountyMarker } from "../../reducers/map";

const mapStateToProps = ({ map: { activeCounty, searching }, panel: { panelOpen } }) => ({
  activeCounty,
  searching,
  panelOpen
});

const dispatchProps = {
  togglePanel,
  clearCountyMarker
};

export default connect(mapStateToProps, dispatchProps)(InfoPanel);
