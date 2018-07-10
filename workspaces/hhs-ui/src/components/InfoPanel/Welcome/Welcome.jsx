import React from "react";
import Brand from "../../Brand";
import Title from "../../Title";
import Input from "../../Input";
import styles from "./Welcome.scss";

export default class Welcome extends React.Component {
  state = {
    showWelcomeMessage: false
  };

  toggleShowMore = () => {
    this.setState({
      showWelcomeMessage: !this.state.showWelcomeMessage
    });
  };

  render() {
    return (
      <div>
        <div style={{ display: "flex", flexFlow: "row" }}>
          <Brand style={{ maxWidth: 70, paddingRight: "15px" }} />
          <Title />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "15px"
          }}
        >
          <Input />
        </div>
        <br />
        <div
          className={styles.ShowMore}
          onClick={this.toggleShowMore}
        >
          About {this.state.showWelcomeMessage ? <i className="fas fa-chevron-up"/> : <i className="fas fa-chevron-down"/>}
        </div>
        {this.state.showWelcomeMessage && (
          <div id="welcome">
            <p>
              In 2016,<strong>
                175 Americans died each day from prescription related overdoses
              </strong>{" "}
              (over 64,000 deaths in total). 70% of those that abuse
              prescription medication first obtained them from friends and
              family. Help America fight the epidemic of prescription drug
              abuse!
            </p>
            <p>
              Drug take-back centers are a vital piece of a community opioid
              prevention strategy. Where are take-back centers currently
              located? What areas are still undeserved? Using data provided by
              HHS, DEA, and others, Take-Back AMERICA helps health practitioners
              and the public address these questions. Use the map below to find
              drug disposal centers near you while highlighting at risk
              communities that are still in need of take-back locations.
            </p>
          </div>
        )}
      </div>
    );
  }
}
