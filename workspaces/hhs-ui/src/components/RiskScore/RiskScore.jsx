import React from "react";

const riskColors = [
  "#FFEDA0",
  "#FED976",
  "#FEB24C",
  "#FD8D3C",
  "#FC4E2A",
  "#E31A1C",
  "#BD0026",
  "#800026"
];

const getColorByRisk = score => {
  const risk = Number(score);
  if (isNaN(risk)) {
    return "#DCDCDC";
  } else if (risk > 0.7) {
    return "#800026";
  } else if (risk > 0.6) {
    return "#BD0026";
  } else if (risk > 0.5) {
    return "#E31A1C";
  } else if (risk > 0.4) {
    return "#FC4E2A";
  } else if (risk > 0.3) {
    return "#FD8D3C";
  } else if (risk > 0.2) {
    return "#FEB24C";
  } else if (risk > 0.1) {
    return "#FED976";
  } else {
    return "#FFEDA0";
  }
};

const RiskMarker = () => (
  <span
    style={{
      position: "relative",
      top: "20px",
      fontSize: "18px",
      marginLeft: 0
    }}
  >
    <i className="fas fa-arrow-alt-circle-up" />
  </span>
);

const RiskScore = ({ riskScore }) => (
  <React.Fragment>
    <h3 style={{ marginBottom: 15 }}>OVERALL RISK SCORE: {riskScore}</h3>
    <div
      style={{
        display: "flex",
        height: "20px",
        marginTop: "5px",
        marginBottom: "30px"
      }}
    >
      {riskColors.map(color => (
        <div
          key={color}
          style={{
            backgroundColor: color,
            flex: 1,
            display: "flex",
            justifyContent: "center"
          }}
        >
          {getColorByRisk(riskScore) === color && <RiskMarker />}
        </div>
      ))}
    </div>
  </React.Fragment>
);

export default RiskScore;
