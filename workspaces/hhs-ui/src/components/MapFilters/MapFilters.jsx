import React, { PureComponent } from "react";
import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';
import styles from "./MapFilters.scss";
import RiskScore from "../RiskScore/RiskScore";

export default class MapFilters extends PureComponent {
  state = {
    localScoreFilter: [0,1]
  }

  onFilterChange = range => {
    this.setState({
      localScoreFilter: range
    });
  }

  onToggleFilters = () => {
    const { toggleFilters, filtersOpen } = this.props;
    toggleFilters(!filtersOpen);
  }

  getFilterIcon = () => {
    return (
      <div className={styles.MapFiltersButton} onClick={this.onToggleFilters}>
        <i className="fas fa-filter" />
      </div>
    );
  }

  onFilterAfterChange = range => {
    const { setScoreFilter } = this.props;
    setScoreFilter(range);
  }

  render() {
    const { filtersOpen } = this.props;
    const { localScoreFilter } = this.state;
    return (
      <div>
        {this.getFilterIcon()}
        <div className={`${styles.MapFilters} ${!filtersOpen ? styles.MapFiltersHidden : ""}`}>
          <h4>Map Filters</h4>
          <div className={styles.MapFiltersGroup}>
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
            />
          </div>
        </div>
      </div>
    );
  }
}
