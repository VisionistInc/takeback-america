import React from "react";

const riskColors = [
/*  "#e3d9a1",
  "#aabe8e",
  "#46a868",
  "#008971",
  "#00696d",
  "#00485b",
  "#002a3d"
*/
  //ORANGES
  //BROWNS
  //YELLOWS
//  "#fbf2ca",
  "#fdf9e2",
  "#f9f3c6",
  "#f4e596",
  "#f1d77e",
  "#ecc267",
  "#e7a153",
  "#ff9200",
  "#f66500",
  "#e40101",
  "#b31b18",
  "#8c131e",
  "#700822"
];

const rskcol = [
  //NULL
  "DCDCDC",
  //   4  REDS
  "#700822",
  "#8c131e",
  "#b31b18",
  "#e40101",
  //ORANGES
  "#f66500",
  "#ff9200",
  //BROWNS
  "#e7a153",
  "#ecc267",
  "#f1d77e",
  //YELLOWS
  "#f4e596",
  "#f9f3c6",
//  "#fbf2ca"
  "#fdf9e2"

    ]



const getColorByRisk = score => {
  const risk = Number(score);
/*    if (isNaN(risk)) {
      return "#DCDCDC";
    } else if (risk > 0.8) {
      return "#002a3d";
    } else if (risk > 0.7) {
      return "#00485b";
    } else if (risk > 0.6) {
      return "#00696d";
    } else if (risk > 0.5) {
      return "#008971";
    } else if (risk > 0.4) {
      return "#46a868";
    } else if (risk > 0.3) {
      return "#aabe8e";
    } else if (risk > 0.2) {
      return "#e3d9a1";
    } else {
      return "#FFEDA0";
    }
*/
    if (isNaN(risk)) {
      return rskcol[0];
    } else if (risk > 0.7) {
      return rskcol[1];
    } else if (risk > 0.6) {
      return rskcol[2];
    } else if (risk > 0.5) {
      return rskcol[3];
    } else if (risk > 0.475) {
      return rskcol[4];
    } else if (risk > 0.45) {
      return rskcol[5];
    } else if (risk > 0.425) {
      return rskcol[6];
    } else if (risk > 0.4) {
      return rskcol[7];
    } else if (risk > 0.375) {
      return rskcol[8];
    } else if (risk > 0.35) {
      return rskcol[9];
    } else if (risk > 0.325) {
      return rskcol[10];;
    } else if (risk > 0.3) {
      return rskcol[11];
    } else if (risk > 0.2) {
      return rskcol[12];
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

const RiskScore = ({ riskScore, title }) => (
  <React.Fragment>
    {title && riskScore && 
      <h3 style={{ marginBottom: 15, textTransform: "uppercase" }}>{title}: {riskScore}</h3>
    }
    <div
      style={{
        display: "flex",
        height: "20px",
        marginTop: "5px",
        marginBottom: "20px",
        width: "100%"
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
