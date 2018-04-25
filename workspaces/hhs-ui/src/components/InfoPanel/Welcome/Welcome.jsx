import React from "react";
import Title from "../../Title";
import Brand from "../../Brand";
import Input from "../../Input";
import styles from "./Welcome.scss";

export const Spacer = props => {
  return <div className={styles.Spacer} {...props} />;
};

export default function Welcome() {
  return (
    <div>
      <Brand style={{ maxWidth: 90 }} />
      <Spacer />
      <Title />
      <div id="welcome">
        <p>
          In 2016,<strong>
            175 Americans died each day from prescription related overdoses
          </strong>{" "}
          (over 64,000 deaths in totla). 70% of those that abuse prescription
          medication first obtained them from friends and family. Help America
          fight the epidemic of prescription drug abuse!
        </p>
        <p>
          Drug take-back centers are a vital piece of a community opioid
          prevention strategy. Where are take-back centers currently located?
          What areas are still undeserved? Using data provided by HHS, DEA, and
          others, Take-Back AMERICA helps health practitioners and the public
          address these questions. Use the map below to find drug disposal
          centers near you while highlighting at risk communities that are still
          in need of take-back locations.
        </p>
        <div>
          <strong>How Does Your Area Stack up?</strong>
          <Spacer>
            <Input />
          </Spacer>
        </div>
      </div>
    </div>
  );
}
