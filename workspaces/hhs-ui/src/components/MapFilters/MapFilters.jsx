import React, { PureComponent } from "react";
import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';
import styles from "./MapFilters.scss";
import RiskScore from "../RiskScore/RiskScore";

export default class MapFilters extends PureComponent {
  state = {
    localScoreFilter: [0,1],
    mapIsFiltered: false
  }

  onFilterChange = range => {
    const { localScoreFilter } = this.state;
    console.log(range);
    this.setState({
      localScoreFilter: range,
      mapIsFiltered: range[0] > 0 || range[1] < 1
    });
  }

  onToggleFilters = () => {
    const { toggleFilters, filtersOpen } = this.props;
    toggleFilters(!filtersOpen);
  }

  getFilterIcon = () => {
    const { mapIsFiltered } = this.state;
    return (
      <div 
        className={mapIsFiltered ? styles.MapFiltersButtonFiltered : styles.MapFiltersButton} 
        onClick={this.onToggleFilters}>
        <i className="fas fa-filter" />
        <span className={styles.FilterLabel}>Filter: { mapIsFiltered ? "On" : "Off"}</span>
      </div>
    );
  }

  onFilterAfterChange = range => {
    const { setScoreFilter } = this.props;
    setScoreFilter(range);
  }

  handleStyle = { 
    backgroundColor: '#66BBFF',
    borderColor: '#FFF'
  }

  render() {
    const { filtersOpen } = this.props;
    const { localScoreFilter } = this.state;

    return (
      <div>
        {this.getFilterIcon()}
        <div className={`${styles.MapFiltersContainer} ${!filtersOpen ? styles.MapFiltersHidden : ""}`}>
          <div className={styles.MapFiltersGroup}>
            <h3>Overall Risk Score</h3>
            <RiskScore />
            <Range 
              value={localScoreFilter}
              min={0}
              max={1}
              step={.125}
              defaultValue={[0, 1]}
              allowCross={false}
              onChange={this.onFilterChange}
              onAfterChange={this.onFilterAfterChange}
              trackStyle={[{ backgroundColor: '#17436B' }]}
              handleStyle={[this.handleStyle, this.handleStyle]}
            />
          </div>
        </div>
      </div>
    );
  }
}
