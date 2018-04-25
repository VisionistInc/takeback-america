import React, { PureComponent } from "react";
import Details from "./Details";
import Welcome from "./Welcome";
import Spinner from "../Spinner";
import styles from "./InfoPanel.scss";

export default class InfoPanel extends PureComponent {
  renderContent = () => {
    const { activeCounty } = this.props;
    return !!Object.keys(activeCounty).length ? (
      <Details activeCounty={activeCounty} />
    ) : (
      <Welcome />
    );
  };
  render() {
    const { searching } = this.props;
    return (
      <div className={styles.InfoPanel}>
        {searching ? <Spinner /> : this.renderContent()}
      </div>
    );
  }
}
