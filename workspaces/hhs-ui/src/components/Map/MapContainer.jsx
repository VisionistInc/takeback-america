import React, { PureComponent } from "react";
import Map from "./Map";
import Spinner from "../Spinner";

export default class MapContainer extends PureComponent {
  componentDidMount() {
    const { fetchCountiesAndDropMarkers } = this.props;
    fetchCountiesAndDropMarkers();
  }

getColorByRisk = ({ Overall }) => {
  const rskcol = [
//NULL
"DCDCDC",
//   4  REDS
"#700822",
"#8c131e",
"#b31b18",
"#e40101",
//ORANGES
"#f66500",
"#ff9200",
//BROWNS
"#e7a153",
"#ecc267",
"#f1d77e",
//YELLOWS
"#f4e596",
"#f9f3c6",
"#fdf9e2"
  ]

  const risk = Number(Overall);
  if (isNaN(risk)) {
    return rskcol[0];
  } else if (risk > 0.7) {
    return rskcol[1];
  } else if (risk > 0.6) {
    return rskcol[2];
  } else if (risk > 0.5) {
    return rskcol[3];
  } else if (risk > 0.475) {
    return rskcol[4];
  } else if (risk > 0.45) {
    return rskcol[5];
  } else if (risk > 0.425) {
    return rskcol[6];
  } else if (risk > 0.4) {
    return rskcol[7];
  } else if (risk > 0.375) {
    return rskcol[8];
  } else if (risk > 0.35) {
    return rskcol[9];
  } else if (risk > 0.325) {
    return rskcol[10];;
  } else if (risk > 0.3) {
    return rskcol[11];
  } else if (risk > 0.2) {
    return rskcol[12];
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
      color: "#bab9c4",
      dashArray: "3",
      fillOpacity: this.isActiveCounty(feature.properties) ? 0.5 : 1
    };
  };

  styleState = feature => {
    const { zoom } = this.props;
    return {
      fillColor: 'transparent',
      weight: zoom / 10,
      opacity: 1,
      color: "#5a5972"
    };
  }

  onCountyMouseOver = e => {
    const layer = e.target;
    layer.setStyle({
      weight: 4,
      fillOpacity: .4,
      fillColor: "#0000de"
    });
  };

  onCountyClick = event => {
    const { onCountyClick, togglePanel } = this.props;
    onCountyClick(event);
    togglePanel(true);
    const layer = event.target;
    layer.setStyle({
      fillColor: "#0000de",
      fillOpacity: .4
    })
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
      <Spinner />
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