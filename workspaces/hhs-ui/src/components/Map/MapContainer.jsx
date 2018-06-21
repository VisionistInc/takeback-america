import React, { PureComponent } from "react";
import Map from "./Map";

export default class MapContainer extends PureComponent {
  componentDidMount() {
    const { fetchCountiesAndDropMarkers } = this.props;
    fetchCountiesAndDropMarkers();
  }

  getColorByRisk = ({ Overall }) => {
    const risk = Number(Overall);
    if (isNaN(risk)) {
      return "#DCDCDC";
    } else if (risk > 0.7) {
      return "#800026";
    } else if (risk > 0.6) {
      return "#BD0026";
    } else if (risk > 0.5) {
      return "#E31A1C";
    } else if (risk > 0.4) {
      return "#FC4E2A";
    } else if (risk > 0.3) {
      return "#FD8D3C";
    } else if (risk > 0.2) {
      return "#FEB24C";
    } else if (risk > 0.1) {
      return "#FED976";
    } else {
      return "#FFEDA0";
    }
  };

  isActiveCounty = county => {
    const { activeCounty } = this.props;
    return (
      `${county.STATE}-${county.COUNTY}` ===
      `${activeCounty.STATE}-${activeCounty.COUNTY}`
    );
  };

  styleCounty = feature => {
    const { zoom } = this.props;
    return {
      fillColor: this.getColorByRisk(feature.properties),
      weight: zoom / 6,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: this.isActiveCounty(feature.properties) ? 0.5 : 1
    };
  };

  styleState = feature => {
    const { zoom } = this.props;
    return {
      fillColor: 'transparent',
      weight: zoom / 3,
      opacity: 1,
      color: "white"
    };
  }

  onCountyMouseOver = e => {
    const layer = e.target;
    layer.setStyle({
      weight: 3,
      fillOpacity: 0.4
    });
  };

  onCountyClick = event => {
    const { onCountyClick, togglePanel } = this.props;
    onCountyClick(event);
    togglePanel(true);
  }

  render() {
    const {
      fetching,
      onCountyClick,
      onCountyMouseOut,
      setGeoJsonLayerRef,
      onZoomChange,
      onMove,
      ...props
    } = this.props;

    return fetching ? (
      <div />
    ) : (
      <Map
        {...props}
        styleCounty={this.styleCounty}
        styleState={this.styleState}
        onCountyClick={this.onCountyClick}
        onCountyMouseOver={this.onCountyMouseOver}
        onCountyMouseOut={onCountyMouseOut}
        setGeoJsonLayerRef={setGeoJsonLayerRef}
        onZoomChange={onZoomChange}
        onMove={onMove}
      />
    );
  }
}
