import React from "react";
import Details from "./Details";
import Welcome from "./Welcome";
import styles from "./InfoPanel.scss";

export default function InfoPanel({ activeCounty }) {
  return (
    <div className={styles.InfoPanel}>
      {!!Object.keys(activeCounty).length ? (
        <Details activeCounty={activeCounty} />
      ) : (
        <Welcome />
      )}
    </div>
  );
}
