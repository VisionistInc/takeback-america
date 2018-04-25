import { connect } from "react-redux";
import { populateZipCodeMap } from "../reducers/map";
import App from "./App";

const mapStateToProps = ({ map: { activeCounty } }) => {
  return {
    showHeader: !!Object.keys(activeCounty).length
  };
};

const dispatchProps = {
  populateZipCodeMap
};

export default connect(mapStateToProps, dispatchProps)(App);
