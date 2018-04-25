import React from "react";
import TakebackLogo from "../../../resources/logo-takeback.png";
import styles from "./Brand.scss";

export default function Brand({ src = TakebackLogo, style = {} } = {}) {
  return (
    <div className={styles.Brand}>
      <img alt="Logo" src={src} style={{ maxWidth: 120, ...style }} />
    </div>
  );
}
