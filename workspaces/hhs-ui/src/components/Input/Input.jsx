import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import isValidZipcode from "../../utils/validZipcode";
import styles from "./Input.scss";

export default class Input extends PureComponent {
  state = {
    inputValue: ""
  };
  static contextTypes = {
    getGeoJsonLayerRef: PropTypes.func
  };
  componentDidMount() {
    const { inputValue } = this.props;
    this.setState({ inputValue });
  }
  extractLayerFromGeoJson = latLng => {
    const { getGeoJsonLayerRef } = this.context;
    const countiesGeoJson = getGeoJsonLayerRef();
    return countiesGeoJson.leafletElement
      .getLayers()
      .find(layer => layer.getBounds().contains(latLng));
  };
  searchZipCode = e => {
    const { key, target } = e;
    const { value: zipcode } = target;
    const { searchZipCode, zipcodeToLatLngMap } = this.props;
    const { inputValue } = this.state;

    // [lat, lng]
    const center = zipcodeToLatLngMap[zipcode] || [];

    if (key === "Enter" && center.length === 2 && isValidZipcode(zipcode)) {
      const geoJsonLayer = this.extractLayerFromGeoJson(center);
      const activeCounty = geoJsonLayer.feature.properties;

      Promise.resolve(
        searchZipCode({
          inputValue,
          activeCounty,
          markerLatLng: geoJsonLayer.getCenter(),
          center,
          zoom: 11
        })
      ).then(() => {
        target.blur();
      });
    }
  };
  onFocus = ({ target }) => {
    target.setSelectionRange(0, target.value.length);
  };
  setInputValue = e => {
    this.setState({ inputValue: e.target.value });
  };
  render() {
    const {
      searchZipCode,
      zipcodeToLatLngMap,
      inputValue,
      setInputValue,
      ...props
    } = this.props;
    const { inputValue: value } = this.state;
    return (
      <div className={styles.Input} {...props}>
        <div style={{ position: "relative" }}>
          <input
            type="number"
            id="header-search"
            placeholder="Search by ZIP code"
            onKeyPress={this.searchZipCode}
            onChange={this.setInputValue}
            onFocus={this.onFocus}
            value={value}
          />
          <div
            style={{
              position: "absolute",
              right: 15,
              top: 11,
              color: "#17436b",
              fontSize: "1.1em"
            }}
          >
            <i className="fas fa-search" />
          </div>
        </div>
      </div>
    );
  }
}
