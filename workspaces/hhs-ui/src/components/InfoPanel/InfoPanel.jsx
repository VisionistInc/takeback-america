import React from "react";
import styles from "./InfoPanel.scss";
import RiskScore from "../RiskScore";

export default function InfoPanel() {
  return (
    <div className={styles.InfoPanel}>
      <RiskScore />
    </div>
  );
}
