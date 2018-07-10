import React from "react";
import { round, isEmpty, startCase } from "lodash";
import ReactTooltip from 'react-tooltip'
import Aux from "../../../utils/Aux";
import Link from "../../Link";
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

const Factor = ({ title, calculation, last, index, notation }) => {
  return (
    <Aux>
      <div className="risk-factor">
        <div className="title">{title}:</div>
        <div className="value">{calculation}</div>
        <InfoTooltip id={index} notation={notation} />
      </div>
      {!last && <Spacer />}
    </Aux>
  );
};

const InfoTooltip = ({ id, notation: Notation }) => (
  <Aux>
    <a className="info-tooltip-button" data-tip data-for={"tooltip-" + id}><i className="fas fa-info-circle" /></a>
    <ReactTooltip
      className="info-tooltip"
      id={"tooltip-" + id} 
      effect="solid"
      place="right"
      type="light"
      border
    >
      <Notation />
    </ReactTooltip>
  </Aux>
);

export default function Details({ activeCounty }) {
  const factors = [
    {
      title: "Drug poisoning death rate per 100,000",
      calculation: round(activeCounty.Drug_Poison_Rate, 2),
      notation: () => (
        <Aux>
          Age-adjusted death rates for drug poisoning per 100,000 population (<Link href="https://www.cdc.gov/nchs/data-visualization/drug-poisoning-mortality/">
            NCHS, 2015
          </Link>)
        </Aux>
      )
    },
    {
      title: "Opioid prescriptions per 100 residents",
      calculation: round(activeCounty.OpioidRX_Rate, 2),
      notation: () => (
        <Aux>
          The estimated rate of opioid prescriptions per 100 residents (<Link href="https://www.cdc.gov/drugoverdose/maps/rxrate-maps.html">
            CDC, 2016
          </Link>)
        </Aux>
      )
    },
    {
      title: "Adults reporting poor or fair health",
      calculation: round(activeCounty.Fair_Poor_Rate, 2),
      notation: () => (
        <Aux>
          Age-adjusted percentage of adults reporting fair or poor health (<Link href="http://www.countyhealthrankings.org/">
            University of Wisconsin, 2015
          </Link>)
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
      <h2 style={{ marginTop: 0 }}>
        <strong>{`${activeCounty.NAME} County${
          !isEmpty(activeCounty.state)
            ? ", " + startCase(activeCounty.state.toLowerCase())
            : ""
        }`}</strong>
      </h2>

      <RiskScore title="Overall Risk Score" riskScore={round(activeCounty.Overall, 2)} />

      <h3 style={{ marginBottom: 5 }}>COMMUNITY RISK FACTORS:</h3>

      {factors.map((item, i) => (
        <Factor key={i} {...item} last={i === factors.length - 1} index={i} />
      ))}
    </div>
  );
}
