import React from "react";
import { round, isEmpty, startCase } from "lodash";
import ReactTooltip from 'react-tooltip'
import Aux from "../../../utils/Aux";
import Link from "../../Link";
import RiskScore from "../../RiskScore";
import styles from "./Details.scss";

const Spacer = () => {
  return <div className={styles.Spacer} />;
};

// Simple check for common mobile devices
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

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
    <a className="info" data-tip data-for={"tooltip-" + id}><i className="fas fa-info-circle" /></a>
    <ReactTooltip
      className="tooltip"
      id={"tooltip-" + id} 
      effect="solid"
      place="right"
      type="light"
      border
      event={isMobile ? "click" : undefined}
    >
      <Notation />
    </ReactTooltip>
  </Aux>
);

export default function Details({ activeCounty }) {
  const factors = [
    {title: "Drug poisoning death rate per 100,000",
      calculation: round(activeCounty.Drug_Poison_Rate, 2),
      notation: () => (
        <Aux>
          Drug poisoning death rate per 100,000 population 
          (CDC age-adjusted or crude rate if not suppressed; NCHS-modeled age-adjusted rate if suppressed)
		<br></br>(<Link href="https://wonder.cdc.gov/ucd-icd10.html">CDC, 2016</Link>; 
			<Link href="https://www.cdc.gov/nchs/data-visualization/drug-poisoning-mortality/"> NCHS, 2016</Link>)
        </Aux>
      )
    },
    {title: "Opioid prescriptions per 100 residents",
      calculation: round(activeCounty.OpioidRX_Rate, 2),
      notation: () => (
        <Aux>
          Estimated rate of opioid prescriptions per 100 residents (state rate if missing county rate)
		<br></br>(<Link href="https://www.cdc.gov/drugoverdose/maps/rxrate-maps.html">
            CDC, 2016
          </Link>)
        </Aux>
      )
    },
    {title: "Poor physical health days reported",
      calculation: round(activeCounty.RSK_Phys_Unhealthy_Days, 2),
      notation: () => (
        <Aux>
          Age-adjusted average number of physically unhealthy days reported in past 30 days
		<br></br>(<Link href="http://www.countyhealthrankings.org/">
            University of Wisconsin, 2016
          </Link>)
        </Aux>
      )
    },    
    {title: "Number of Take-Back sites in county",
      calculation: round(activeCounty.DropBox_Rate, 2),
      notation: () => (
        <Aux>
          Number of DEA-registered prescription drug take-back sites in the county
    <br></br>(Note: This number does not include temporary boxes set up specifically for National Take-Back Day)
		<br></br>(Visionist generated, 2018)
        </Aux>
      )
    }
  ];

  return (
    <div>
      <h2 style={{ marginTop: 0, marginRight: 20 }}>
        <strong>{`${activeCounty.NAME} County${
          !isEmpty(activeCounty.state)
            ? ", " + startCase(activeCounty.state.toLowerCase())
            : ""
        }`}</strong>
      </h2>

      <RiskScore title="Overall Risk Score" riskScore={round(activeCounty.Overall, 2)} />

      <p style={{ marginBottom: 8, fontSize: 15.5}}>
        This ranks in the <b>{`${activeCounty.NatlScore_Ordinal}`}</b> percentile nationwide.
      </p>

      <p style={{ marginTop: 0, fontSize: 15.5}}>
      This ranks <b>{`${activeCounty.StateScore_Ordinal}`}</b> of <b>{`${activeCounty.CountyCount}`}</b> counties statewide.
      </p>

      <h3 style={{ marginBottom: 5 }}>COMMUNITY RISK FACTORS:</h3>

      {factors.map((item, i) => (
        <Factor key={i} {...item} last={i === factors.length - 1} index={i} />
      ))}

    </div>
  );
}
