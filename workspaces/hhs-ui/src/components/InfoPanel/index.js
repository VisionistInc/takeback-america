import { connect } from "react-redux";
import InfoPanel from "./InfoPanel";

const mapStateToProps = ({ map: { activeCounty } }) => ({ activeCounty });

export default connect(mapStateToProps)(InfoPanel);
