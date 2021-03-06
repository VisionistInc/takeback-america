import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";
import Map from "./Map";
import InfoPanel from "./InfoPanel";
import Header from "./Header";
import Footer from "./Footer";
import MapFilters from "./MapFilters";
import isValidZipcode from "../utils/validZipcode";
import styles from "./App.scss";

export default class App extends PureComponent {
  static childContextTypes = {
    getGeoJsonLayerRef: PropTypes.func
  };

  getChildContext() {
    return { getGeoJsonLayerRef: this.getGeoJsonLayerRef };
  }

  componentDidMount() {
    const { populateZipCodeMap } = this.props;
    populateZipCodeMap();
  }

  searchZipCode = e => {
    const { key, target } = e;
    const { value: zipcode } = target;
    const { zipcodeToLatLngMap } = this.state;

    // [lat, lng]
    const center = zipcodeToLatLngMap[zipcode] || [];

    if (key === "Enter" && center.length === 2 && isValidZipcode(zipcode)) {
      const geoJsonLayer = this.extractLayerFromGeoJson(center);
      const activeCounty = geoJsonLayer.feature.properties;

      this.setState(() => ({
        activeCounty,
        markerLatLng: geoJsonLayer.getCenter(),
        center,
        zoom: 11
      }));
    }
  };

  validateZipcode = zipcode =>
    this.setState(() => ({ validZipcode: isValidZipcode(zipcode) }));

  debouncedValidateZipcode = debounce(this.validateZipcode, 250);

  toggleTakeBackfilter = () =>
    this.setState(({ takeBackFilter }) => ({
      takeBackFilter: !takeBackFilter
    }));

  onCountyMouseOut = e => {
    const layer = e.target;
    this.countiesGeoJson.leafletElement.resetStyle(layer);
  };

  getGeoJsonLayerRef = () => this.countiesGeoJson;

  setGeoJsonLayerRef = ref => {
    this.countiesGeoJson = ref;
  };

  extractLayerFromGeoJson = latLng =>
    this.countiesGeoJson.leafletElement
      .getLayers()
      .find(layer => layer.getBounds().contains(latLng));

  toggleHeader = () => this.setState({ showHeader: !this.state.showHeader });

  render() {
    const { showHeader, panelOpen } = this.props;
    return (
      <div className={styles.App}>
        <div className={styles.Header} style={{ height: showHeader ? 110 : 0 }}>
          {(panelOpen || showHeader) && <Header />}
        </div>
        <div className={styles.Bumper}>
          <InfoPanel />
          <MapFilters />
          <Map
            onCountyMouseOut={this.onCountyMouseOut}
            setGeoJsonLayerRef={this.setGeoJsonLayerRef}
          />
        </div>
        <div className={styles.Footer}>
          <Footer />
        </div>
      </div>
    );
  }
}
