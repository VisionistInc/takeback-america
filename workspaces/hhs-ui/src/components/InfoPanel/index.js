import { connect } from "react-redux";
import InfoPanel from "./InfoPanel";
import { togglePanel } from "../../reducers/panel";

const mapStateToProps = ({ map: { activeCounty, searching }, panel: { panelOpen } }) => ({
  activeCounty,
  searching,
  panelOpen
});

const dispatchProps = {
  togglePanel
};

export default connect(mapStateToProps, dispatchProps)(InfoPanel);
