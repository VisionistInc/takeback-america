import React from "react";
import InfiniteSpin from "../InfiniteSpin";
import styles from "./Spinner.scss";

export default function Spinner(props) {
  return (
    <div className={styles.Container} {...props}>
      <InfiniteSpin>
        <img
          className={styles.Image}
          alt="nanostorm"
          src={require("../../../resources/logo-spinner.png")}
        />
      </InfiniteSpin>
    </div>
  );
}
