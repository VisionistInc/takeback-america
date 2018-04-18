import React from "react";

import Map from "./Map";

class MapContainer extends React.Component {
  state = {
    accessToken:
      "pk.eyJ1IjoiZG1tdWxyb3kiLCJhIjoiY2phdm03dG9xMGRwcDM3bzF3eXM4bGk4NCJ9.3yHHDzFiJO-lZ4--hfL33Q",
    counties: [],
    dropMarkers: [],
    fetching: true
  };

  async componentDidMount() {
    try {
      const [counties, dropMarkers] = await Promise.all([
        fetch("/api/geojson/counties").then(res => res.json()),
        fetch("/api/geojson/drop_markers").then(res => res.json())
      ]);
      this.setState(() => ({ counties, dropMarkers, fetching: false }));
    } catch (err) {
      console.log("Error:", err);
    }
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

  styleCounty = feature => ({
    fillColor: this.getColorByRisk(feature.properties),
    weight: 1,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.7
  });

  onCountyMouseOver = e => {
    const layer = e.target;

    layer.setStyle({
      weight: 3,
      fillOpacity: 0.4
    });
  };

  render() {
    const { fetching } = this.state;
    const {
      center,
      zoom,
      markerLatLng,
      onCountyClick,
      onCountyMouseOut,
      setGeoJsonLayerRef,
      takeBackFilter,
      onZoomChange,
      onMove,
      zoomTakeBackFilter
    } = this.props;

    return fetching ? (
      <div />
    ) : (
      <Map
        {...this.state}
        center={center}
        markerLatLng={markerLatLng}
        zoom={zoom}
        takeBackFilter={takeBackFilter}
        styleCounty={this.styleCounty}
        onCountyClick={onCountyClick}
        onCountyMouseOver={this.onCountyMouseOver}
        onCountyMouseOut={onCountyMouseOut}
        setGeoJsonLayerRef={setGeoJsonLayerRef}
        onZoomChange={onZoomChange}
        onMove={onMove}
        zoomTakeBackFilter={zoomTakeBackFilter}
      />
    );
  }
}

export default MapContainer;
