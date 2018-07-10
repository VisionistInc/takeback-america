import isValidZipcode from "../../utils/validZipcode";
import {
  ON_COUNTY_CLICK,
  ON_ZOOM_CHANGE,
  ON_MOVE,
  FETCH_COUNTIES_AND_DROP_MARKERS,
  VALIDATE_ZIP_CODE,
  SEARCH_ZIP_CODE,
  POPULATE_ZIP_CODE_MAP,
  SET_INPUT_VALUE
} from "./actions";

export let geoJsonLayer = null;

export const fetchCountiesAndDropMarkers = () => async dispatch => {
  try {
    const [counties, dropMarkers, states] = await Promise.all([
      fetch("/api/geojson/counties").then(res => res.json()),
      fetch("/api/geojson/drop_markers").then(res => res.json()),
      fetch("/api/geojson/states").then(res => res.json()),
    ]);
    return dispatch({
      type: FETCH_COUNTIES_AND_DROP_MARKERS,
      counties,
      dropMarkers,
      states
    });
  } catch (err) {
    console.error("Error:", err);
    return Promise.resolve();
  }
};

export const onCountyClick = ({ target }) => {
  console.log("onCountyClick", target.feature.properties);
  return {
    type: ON_COUNTY_CLICK,
    activeCounty: { ...target.feature.properties },
    markerLatLng: target.getCenter()
  };
};

export const clearCountyMarker = () => {
  return {
    type: ON_COUNTY_CLICK,
    markerLatLng: null,
  }
}

export const onZoomChange = zoom => {
  return {
    type: ON_ZOOM_CHANGE,
    zoom,
    zoomTakeBackFilter: zoom >= 10
  };
};

export const onMove = ({ target }) => {
  return {
    type: ON_MOVE,
    center: target.getCenter()
  };
};

export const validateZipCode = zipcode => {
  return {
    type: VALIDATE_ZIP_CODE,
    validZipcode: isValidZipcode(zipcode)
  };
};

export const setInputValue = inputValue => {
  return {
    type: SET_INPUT_VALUE,
    inputValue
  };
};

export const searchZipCode = ({
  inputValue,
  activeCounty,
  markerLatLng,
  center,
  zoom
}) => dispatch => {
  /**
   * Mimics a fake loading spinner
   */
  dispatch({ type: SEARCH_ZIP_CODE, searching: true });
  setTimeout(() => {
    dispatch({
      type: SEARCH_ZIP_CODE,
      inputValue,
      activeCounty,
      markerLatLng,
      center,
      zoom,
      searching: false
    });
  }, 1000);

  return Promise.resolve();
};

export const populateZipCodeMap = () => async dispatch => {
  try {
    const zipcodeToLatLngMap = await fetch("/api/lat_lng/zipcode").then(res =>
      res.json()
    );
    return dispatch({
      type: POPULATE_ZIP_CODE_MAP,
      zipcodeToLatLngMap
    });
  } catch (err) {
    console.error("Error:", err);
    return Promise.resolve();
  }
};
