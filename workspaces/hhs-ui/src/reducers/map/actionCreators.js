import isValidZipcode from "../../utils/validZipcode";
import {
  ON_COUNTY_CLICK,
  ON_ZOOM_CHANGE,
  FETCH_COUNTIES_AND_DROP_MARKERS,
  VALIDATE_ZIP_CODE,
  SEARCH_ZIP_CODE
} from "./actions";

export const fetchCountiesAndDropMarkers = () => async dispatch => {
  try {
    const [counties, dropMarkers] = await Promise.all([
      fetch("/api/geojson/counties").then(res => res.json()),
      fetch("/api/geojson/drop_markers").then(res => res.json())
    ]);
    return dispatch({
      type: FETCH_COUNTIES_AND_DROP_MARKERS,
      counties,
      dropMarkers
    });
  } catch (err) {
    console.error("Error:", err);
    return Promise.resolve();
  }
};

export const onCountyClick = ({ target }) => {
  return {
    type: ON_COUNTY_CLICK,
    activeCounty: { ...target.feature.properties },
    markerLatLng: target.getCenter()
  };
};

export const onZoomChange = zoom => {
  return {
    type: ON_ZOOM_CHANGE,
    zoom,
    zoomTakeBackFilter: zoom >= 11
  };
};

export const validateZipCode = zipcode => {
  return {
    type: VALIDATE_ZIP_CODE,
    validZipcode: isValidZipcode(zipcode)
  };
};

export const searchZipCode = e => (dispatch, getState) => {
  const { key, target } = e;
  const { value: zipcode } = target;
  const { zipcodeToLatLngMap } = getState();

  // [lat, lng]
  const center = zipcodeToLatLngMap[zipcode] || [];

  if (key === "Enter" && center.length === 2 && isValidZipcode(zipcode)) {
    const geoJsonLayer = this.extractLayerFromGeoJson(center);
    const activeCounty = geoJsonLayer.feature.properties;

    return dispatch({
      type: SEARCH_ZIP_CODE,
      activeCounty,
      markerLatLng: geoJsonLayer.getCenter(),
      center,
      zoom: 11
    });
  }
};
