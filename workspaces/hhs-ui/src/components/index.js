import { connect } from "react-redux";
import { populateZipCodeMap } from "../reducers/map";
import App from "./App";

const mapStateToProps = ({ map: { activeCounty }, panel: { panelOpen } }) => {
  return {
    showHeader: !!Object.keys(activeCounty).length || !panelOpen,
  };
};

const dispatchProps = {
  populateZipCodeMap
};

export default connect(mapStateToProps, dispatchProps)(App);
