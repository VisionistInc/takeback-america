import { connect } from "react-redux";
import { searchZipCode, setInputValue } from "../../reducers/map";
import Input from "./Input";

const mapStateToProps = ({ map: { zipcodeToLatLngMap, inputValue } }) => ({
  zipcodeToLatLngMap,
  inputValue
});

const dispatchProps = {
  searchZipCode,
  setInputValue
};

export default connect(mapStateToProps, dispatchProps)(Input);
