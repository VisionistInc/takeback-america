import { connect } from "react-redux";
import InfoPanel from "./InfoPanel";

const mapStateToProps = ({ map: { activeCounty, searching } }) => ({
  activeCounty,
  searching
});

export default connect(mapStateToProps)(InfoPanel);
