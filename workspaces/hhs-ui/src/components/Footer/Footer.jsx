import React from "react";
import Brand from "../Brand";
import Link from "../Link";
import VisionistLogo from "../../../resources/logo-visionist.png";
import styles from "./Footer.scss";

export default function Footer() {
  return (
    <div className={styles.Footer}>
      <Brand style={{ maxWidth: 135 }} src={VisionistLogo} />
      <div className={styles.Info}>
        Take-Back America is a tool developed by data scientists and engineers
        from{" "}
        <Link href="https://www.visionistinc.com/">
          <strong>Visionist Inc.</strong>
        </Link>{" "}
        during the U.S. Department of Health & Human Services{" "}
        <Link href="https://www.visionistinc.com/hhs-hack-a-thon/">
          24-hour Opioid Code-a-Thon
        </Link>.
      </div>
      <div className={styles.Links}>
        <div className={styles.LinkIcon}>
          <i className="fas fa-chevron-circle-right" />
        </div>
        <Link href="mailto:health@visionistinc.com">Contact The Team</Link>
      </div>
    </div>
  );
}
