import React from "react";
import {
  Map as LeafletMap,
  TileLayer,
  ZoomControl,
  GeoJSON,
  CircleMarker,
  Marker,
  Popup
} from "react-leaflet";
import styles from "./Map.scss";

const Map = ({
  accessToken,
  center,
  zoom,
  takeBackFilter,
  counties,
  states,
  dropMarkers,
  markerLatLng,
  styleCounty,
  styleState,
  onCountyClick,
  onCountyMouseOver,
  onCountyMouseOut,
  onZoomChange,
  onMove,
  setGeoJsonLayerRef,
  zoomTakeBackFilter,
  scoreFilter
}) => {

  const onEachFeature = (feature, layer) => {
    layer.on({
      click: onCountyClick,
      mouseover: onCountyMouseOver,
      mouseout: onCountyMouseOut
    });
  }

  const filterFeatures = (feature) => {
    const { Overall } = feature.properties;
    if (Overall) {
      return Overall >= scoreFilter[0] && Overall <= scoreFilter[1];
    }
    return true;
  }

  return (
    <div className={styles.Map}>
      <LeafletMap
        center={center}
        minZoom={3}
        zoom={zoom}
        zoomControl={false}
        preferCanvas
        onZoom={({ target }) => onZoomChange(target.getZoom())}
        onMove={onMove}
      >
        <ZoomControl position="topright" />
        <TileLayer
          url={`https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=${accessToken}`}
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        {markerLatLng && <Marker position={markerLatLng} />}
        {(takeBackFilter || zoomTakeBackFilter) &&
          dropMarkers.map(({ lat, lng, name, address, googleMapsUrl }, idx) => (
            <CircleMarker
              key={idx}
              fillColor="#66BBFF"
              fillOpacity={1}
              center={[Number(lat), Number(lng)]}
              radius={4}
            >
              <Popup>
                <div>
                  <p>
                    {name} <br />
                    <a href={googleMapsUrl} target="_blank">
                      {address}
                    </a>
                  </p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        <GeoJSON
          key={scoreFilter.toString()} //Key will allow the re-render to occur when filters are picked
          data={counties}
          style={styleCounty}
          onEachFeature={onEachFeature}
          ref={setGeoJsonLayerRef}
          filter={filterFeatures}
        />
        <GeoJSON
          data={states}
          style={styleState}
          interactive={false}
        />
      </LeafletMap>
    </div>
  );
};

export default Map;
