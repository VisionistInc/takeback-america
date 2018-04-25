import React from "react";
import styles from "./InfoPanel.scss";
import RiskScore from "../RiskScore";
import Welcome from "./Welcome";

export default function InfoPanel() {
  return (
    <div className={styles.InfoPanel}>
      <Welcome />
    </div>
  );
}
