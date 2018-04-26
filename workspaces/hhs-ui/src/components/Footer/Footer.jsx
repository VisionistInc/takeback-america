import React from "react";
import Brand from "../Brand";
import Link from "../Link";
import VisionistLogo from "../../../resources/logo-visionist.png";
import HHSLogo from "../../../resources/logo-hhs.jpg";
import styles from "./Footer.scss";

export default function Footer() {
  return (
    <div className={styles.Footer}>
      <Brand style={{ maxWidth: 135 }} src={VisionistLogo} />
      <Brand style={{ maxWidth: 65, marginLeft: 25 }} src={HHSLogo} />
      <p className={styles.Info}>
        Take-Back America is a tool developed by data scientists and engineers
        from{" "}
        <Link href="https://www.visionistinc.com/">
          <strong>Visionist Inc.</strong>
        </Link>{" "}
        during the U.S. Department of Health & Human Services{" "}
        <Link href="https://www.visionistinc.com/hhs-hack-a-thon/">
          24-hour Opioid Code-a-Thon
        </Link>.
      </p>
      <div className={styles.Links}>
        <div>
          <i className="fas fa-chevron-circle-right" />
          <Link href="mailto:health@visionistinc.com">Contact The Team</Link>
        </div>
        {/* <div>
          <i className="fas fa-chevron-circle-right" />
          What's Next?
        </div> */}
      </div>
    </div>
  );
}
