import React, { PureComponent } from "react";
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

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this.leafletMap = undefined;
  }

  componentDidMount() {
    this.leafletMap = this.refs.map.leafletElement;    
  }

  onEachFeature = (feature, layer) => {
    const {
      onCountyClick,
      onCountyMouseOver,
      onCountyMouseOut 
    } = this.props;
  
    layer.on({
      click: onCountyClick,
      mouseover: onCountyMouseOver,
      mouseout: onCountyMouseOut
    });
  }
  
  filterFeatures = (feature) => {
    const { scoreFilter } = this.props;
    const { Overall } = feature.properties;
    if (Overall) {
      return Overall >= scoreFilter[0] && Overall <= scoreFilter[1];
    }
    return true;
  }

  filterDropMarkers = markers => {
    if (!this.leafletMap) return markers;
    const mapBounds = this.leafletMap.getBounds();

    return markers.filter(marker => {
      const latLng = L.latLng([marker.lat, marker.lng]);
      return mapBounds.contains(latLng);
    });
  }

  render() {
    const {
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
      onZoomChange,
      onMove,
      setGeoJsonLayerRef,
      zoomTakeBackFilter,
      scoreFilter
    } = this.props;
    
    const filteredMarkers = this.filterDropMarkers(dropMarkers);
    
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
          ref="map"
        >
          <ZoomControl position="topright" />
          <TileLayer
            url={`https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=${accessToken}`}
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          {markerLatLng && <Marker position={markerLatLng} />}
          {(takeBackFilter || zoomTakeBackFilter) &&
            filteredMarkers.map(({ lat, lng, name, address, googleMapsUrl }, idx) => (
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
            onEachFeature={this.onEachFeature}
            ref={setGeoJsonLayerRef}
            filter={this.filterFeatures}
          />
          <GeoJSON
            data={states}
            style={styleState}
            interactive={false}
          />
        </LeafletMap>
      </div>
    );
  }
}

export default Map;