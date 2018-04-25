import React from "react";
import styles from "./Link.scss";

export default function Link({ children, ...props }) {
  return (
    <a target="_blank" className={styles.Link} {...props}>
      <strong>{children}</strong>
    </a>
  );
}
