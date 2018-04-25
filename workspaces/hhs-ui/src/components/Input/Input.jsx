import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import isValidZipcode from "../../utils/validZipcode";
import styles from "./Input.scss";

export default class Input extends PureComponent {
  static contextTypes = {
    getGeoJsonLayerRef: PropTypes.func
  };
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

    // [lat, lng]
    const center = zipcodeToLatLngMap[zipcode] || [];

    if (key === "Enter" && center.length === 2 && isValidZipcode(zipcode)) {
      const geoJsonLayer = this.extractLayerFromGeoJson(center);
      const activeCounty = geoJsonLayer.feature.properties;

      Promise.resolve(
        searchZipCode({
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
    const { setInputValue } = this.props;
    setInputValue(e.target.value);
  };
  render() {
    const {
      searchZipCode,
      zipcodeToLatLngMap,
      inputValue,
      setInputValue,
      ...props
    } = this.props;
    return (
      <div className={styles.Input} {...props}>
        <div style={{ position: "relative" }}>
          <input
            type="text"
            id="header-search"
            placeholder="Search by ZIP code"
            onKeyPress={this.searchZipCode}
            onChange={this.setInputValue}
            onFocus={this.onFocus}
            value={inputValue}
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
