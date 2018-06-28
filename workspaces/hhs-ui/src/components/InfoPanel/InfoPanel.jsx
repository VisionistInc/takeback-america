import React, { PureComponent } from "react";
import Details from "./Details";
import Welcome from "./Welcome";
import Spinner from "../Spinner";
import styles from "./InfoPanel.scss";

export default class InfoPanel extends PureComponent {

  state = {
    panelOpen: true
  }

  onPanelClose = () => {
    const { togglePanel, clearCountyMarker } = this.props;
    togglePanel(false);
    clearCountyMarker();
  }

  renderContent = () => {
    const { activeCounty } = this.props;
    return !!Object.keys(activeCounty).length ? (
      <Details activeCounty={activeCounty} />
    ) : (
      <Welcome />
    );
  };

  render() {
    const { searching, panelOpen } = this.props;

    if (searching) {
      return <Spinner />;
    }

    return (
      <div className={styles.InfoPanel + " " + (!panelOpen ? styles.HiddenInfoPanel : "")}>
        <div className={styles.InfoPanelCloseButton} onClick={this.onPanelClose}>
          &#x274c;
        </div>
        {this.renderContent()}
      </div>
    );
  }
}
