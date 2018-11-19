import { connect } from "react-redux";
import MapFilters from "./MapFilters";
import {
  toggleFilters,
  setScoreFilter
} from "../../reducers/filters";

const mapStateToProps = ({ filters }) => ({ ...filters });

const dispatchProps = {
  toggleFilters,
  setScoreFilter
};

export default connect(mapStateToProps, dispatchProps)(MapFilters);
