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
import MarkerClusterGroup from 'react-leaflet-markercluster';
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
    else if (scoreFilter[0] === 0 && scoreFilter[1] === 1) {
      return true;
    }
    return false;
  }

  filterDropMarkers = markers => {
    if (!this.leafletMap) return markers;
    const mapBounds = this.leafletMap.getBounds();

    return markers.filter(marker => {
      const latLng = L.latLng([marker.lat, marker.lng]);
      return mapBounds.contains(latLng);
    });
  }

  createClusterCustomIcon = cluster => {
    return L.divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      className: styles.MarkerCluster,
      iconSize: L.point(40, 40, true),
    });
  }

  createMarkerIcon = L.divIcon({
    className: styles.Marker,
    iconSize: L.point(20, 20, true),
  });
  

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
            <MarkerClusterGroup showCoverageOnHover={false} iconCreateFunction={this.createClusterCustomIcon}> {
              filteredMarkers.map(({ lat, lng, name, address, googleMapsUrl }, idx) => (
                <Marker
                  icon={this.createMarkerIcon}
                  key={idx}
                  position={[Number(lat), Number(lng)]}
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
                </Marker>
              ))}
              </MarkerClusterGroup>
            }
          <GeoJSON
            key={"counties:" + scoreFilter.toString()} //Key will allow the re-render to occur when filters are picked
            data={counties}
            style={styleCounty}
            onEachFeature={this.onEachFeature}
            ref={setGeoJsonLayerRef}
            filter={this.filterFeatures}
          />
          <GeoJSON
            key={"states:" + scoreFilter.toString()}
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