import React, { Component } from "react";
import { debounce } from "lodash";
import Map from "./Map";
import InfoPanel from "./InfoPanel";
import styles from "./App.scss";
import isValidZipcode from "../utils/validZipcode";

export default class App extends Component {
  state = {
    activeCounty: {},
    center: [39.8283, -98.5795],
    zoom: 4,
    zipcodeToLatLngMap: {},
    validZipcode: true,
    takeBackFilter: false,
    zoomTakeBackFilter: false
  };

  async componentDidMount() {
    try {
      const zipcodeToLatLngMap = await fetch("/api/lat_lng/zipcode").then(res =>
        res.json()
      );

      this.setState(() => ({ zipcodeToLatLngMap }));
    } catch (err) {
      console.error("Error:", err);
    }
  }

  extractLayerFromGeoJson = latLng =>
    this.countiesGeoJson.leafletElement
      .getLayers()
      .find(layer => layer.getBounds().contains(latLng));

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

  onMove = ({ target }) => this.setState({ center: target.getCenter() });

  debouncedOnMove = debounce(this.onMove, 250);

  debouncedValidateZipcode = debounce(this.validateZipcode, 250);

  toggleTakeBackfilter = () =>
    this.setState(({ takeBackFilter }) => ({
      takeBackFilter: !takeBackFilter
    }));

  onCountyClick = ({ target }) => {
    this.setState(() => ({
      activeCounty: { ...target.feature.properties },
      markerLatLng: target.getCenter()
    }));
  };

  onCountyMouseOut = e => {
    const layer = e.target;
    this.countiesGeoJson.leafletElement.resetStyle(layer);
  };

  setGeoJsonLayerRef = ref => {
    this.countiesGeoJson = ref;
  };

  onZoomChange = zoom =>
    this.setState({ zoom, zoomTakeBackFilter: zoom >= 11 });

  render() {
    return (
      <div className={styles.App}>
        <div className={styles.Header} />
        <div className={styles.Bumper}>
          <InfoPanel />
          <Map
            onCountyClick={this.onCountyClick}
            onCountyMouseOut={this.onCountyMouseOut}
            setGeoJsonLayerRef={this.setGeoJsonLayerRef}
            onZoomChange={this.onZoomChange}
            onMove={this.debouncedOnMove}
          />
        </div>
        <div className={styles.Footer} />
      </div>
    );
  }
}
