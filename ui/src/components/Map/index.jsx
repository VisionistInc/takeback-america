import React from 'react';
import {
  Map as LeafletMap,
  TileLayer,
  ZoomControl,
  GeoJSON,
  CircleMarker,
  Popup
} from 'react-leaflet';

// add geojson style prop/callback

const Map = ({
  accessToken,
  center,
  zoom,
  takeBackFilter,
  counties,
  dropMarkers,
  styleCounty,
  onCountyClick,
  onCountyMouseOver,
  onCountyMouseOut,
  setGeoJsonLayerRef
}) => (
  <div id="map">
    <LeafletMap center={center} zoom={zoom} zoomControl={false} preferCanvas>
      <ZoomControl position="topright" />
      <TileLayer
        url={`https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=${accessToken}`}
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      {takeBackFilter &&
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
        data={counties}
        style={styleCounty}
        onEachFeature={(feature, layer) => {
          layer.on({
            click: onCountyClick,
            mouseover: onCountyMouseOver,
            mouseout: onCountyMouseOut
          });
        }}
        ref={setGeoJsonLayerRef}
      />
    </LeafletMap>
  </div>
);

export default Map;
