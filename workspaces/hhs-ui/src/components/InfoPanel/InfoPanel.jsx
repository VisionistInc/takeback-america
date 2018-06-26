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
    const { togglePanel } = this.props;
    togglePanel(false);
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

    return (
      <div className={styles.InfoPanel + " " + (!panelOpen ? styles.HiddenInfoPanel : "")}>
        <div className={styles.InfoPanelCloseButton} onClick={this.onPanelClose}>
          &#x274c;
        </div>
        {searching ? <Spinner /> : this.renderContent()}
      </div>
    );
  }
}
