import React from "react";
import { round, isEmpty, startCase } from "lodash";
import Aux from "../../../utils/Aux";
import RiskScore from "../../RiskScore";
import styles from "./Details.scss";

const Sup = ({ children }) => {
  return (
    <sup className={styles.Sup}>
      <strong>{children}</strong>
    </sup>
  );
};

const Spacer = () => {
  return <div className={styles.Spacer} />;
};

const Factor = ({ title, calculation, last, index }) => {
  return (
    <Aux>
      <div>
        {title}
        <Sup>{index + 1}</Sup>:
        <br />
        <strong>
          <span>{calculation}</span>
        </strong>
      </div>
      {!last && <Spacer />}
    </Aux>
  );
};

const Subnote = ({ index, notation: Notation, last }) => {
  return (
    <Aux>
      <div className={styles.Subnote}>
        <div>
          <Sup>{index + 1}</Sup>
        </div>
        <div>
          <Notation />
        </div>
      </div>
      {!last && <Spacer />}
    </Aux>
  );
};

export default function Details({ activeCounty }) {
  const factors = [
    {
      title: "Drug poisoning death rate per 100,000",
      calculation: round(activeCounty.Drug_Poison_Rate, 2),
      notation: () => (
        <Aux>
          Age-adjusted death rates for drug poisoning per 100,000 population (<a href="https://www.cdc.gov/nchs/data-visualization/drug-poisoning-mortality/">
            NCHS, 2015
          </a>)
        </Aux>
      )
    },
    {
      title: "Opioid prescriptions per 100 residents",
      calculation: round(activeCounty.OpioidRX_Rate, 2),
      notation: () => (
        <Aux>
          The estimated rate of opioid prescriptions per 100 residents (<a href="https://www.cdc.gov/drugoverdose/maps/rxrate-maps.html">
            CDC, 2016
          </a>)
        </Aux>
      )
    },
    {
      title: "Adults reporting poor or fair health",
      calculation: round(activeCounty.Fair_Poor_Rate, 2),
      notation: () => (
        <Aux>
          Age-adjusted percentage of adults reporting fair or poor health (<a href="http://www.countyhealthrankings.org/">
            University of Wisconson, 2015
          </a>){" "}
        </Aux>
      )
    },
    {
      title: "Take-Back sites per 100,000 population",
      calculation: round(activeCounty.DropBox_Rate, 2),
      notation: () => (
        <Aux>
          The number of registered prescription drug take-back sites per 100,000
          residents (Visionist generated, 2017)
        </Aux>
      )
    }
  ];

  return (
    <div>
      <h2>
        <strong>{`${activeCounty.NAME} County${
          !isEmpty(activeCounty.state)
            ? ", " + startCase(activeCounty.state.toLowerCase())
            : ""
        }`}</strong>
      </h2>

      <RiskScore riskScore={round(activeCounty.Overall, 2)} />

      <h3 style={{ marginBottom: 5 }}>COMMUNITY RISK FACTORS:</h3>

      {factors.map((item, i) => (
        <Factor key={i} {...item} last={i === factors.length - 1} index={i} />
      ))}

      <div className={styles.Divider} />

      {factors.map((item, i) => (
        <Subnote key={i} {...item} last={i === factors.length - 1} index={i} />
      ))}
    </div>
  );
}
