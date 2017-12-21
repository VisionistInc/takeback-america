import React, { Component } from 'react';
import debounce from 'lodash.debounce';

import Header from 'components/Header';
import InfoPanel from 'containers/InfoPanel';
import Map from 'containers/Map';
import isValidZipcode from 'utils/validZipcode';

class App extends Component {
  state = {
    activeCounty: {},
    center: [39.8283, -98.5795],
    zoom: 4,
    zipcodeToLatLngMap: {},
    validZipcode: true,
    takeBackFilter: false
  };

  async componentDidMount() {
    try {
      const zipcodeToLatLngMap = await fetch('/api/lat_lng/zipcode').then(res =>
        res.json()
      );

      this.setState(() => ({ zipcodeToLatLngMap }));
    } catch (err) {
      console.log('Error:', err);
    }
  }

  searchZipCode = e => {
    const { key, target } = e;
    const { value: zipcode } = target;
    const { zipcodeToLatLngMap, validZipcode } = this.state;

    // [lat, lng]
    const center = zipcodeToLatLngMap[zipcode] || [];

    if (key === 'Enter' && center.length === 2 && validZipcode) {
      this.setState(() => ({
        center,
        zoom: 11
      }));
    }
  };

  validateZipcode = zipcode =>
    this.setState(() => ({ validZipcode: isValidZipcode(zipcode) }));

  debouncedValidateZipcode = e => {
    e.persist();
    debounce(this.validateZipcode, 250)(e.target.value);
  };

  toggleTakeBackfilter = () =>
    this.setState(({ takeBackFilter }) => ({
      takeBackFilter: !takeBackFilter
    }));

  onCountyClick = ({ target }) =>
    this.setState(() => ({ activeCounty: { ...target.feature.properties } }));

  render() {
    const {
      activeCounty,
      center,
      zoom,
      takeBackFilter,
      validZipcode
    } = this.state;
    return (
      <div id="container">
        <Header
          searchZipCode={this.searchZipCode}
          validateZipcode={this.debouncedValidateZipcode}
          validZipcode={validZipcode}
          takeBackFilter={takeBackFilter}
          toggleTakeBackfilter={this.toggleTakeBackfilter}
        />
        <Map
          center={center}
          zoom={zoom}
          takeBackFilter={takeBackFilter}
          onCountyClick={this.onCountyClick}
        />
        <InfoPanel activeCounty={activeCounty} />
        }
      </div>
    );
  }
}

export default App;
