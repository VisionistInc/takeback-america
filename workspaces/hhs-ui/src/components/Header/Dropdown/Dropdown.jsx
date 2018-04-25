import React, { PureComponent } from "react";
import Aux from "../../../utils/Aux";
import styles from "./Dropdown.scss";

const DROPDOWN_OPTIONS = [
  {
    title: "HHS.gov",
    subtitle: "Opiod Epidemic",
    href: "https://www.hhs.gov/opioids/"
  },
  {
    title: "SAMSHA.gov",
    subtitle: "Grantee Stories, Tools, and Resources",
    href:
      "https://www.samhsa.gov/capt/tools-learning-resources?combine&field_prevention_topics_tid=1985&field_spf_tid=All&taxonomy_entity_index_tid_depth=All"
  },
  {
    title: "DrugAbuse.gov",
    subtitle: "NIH: Opioid Crisis",
    href: "https://www.drugabuse.gov/drugs-abuse/opioids/opioid-overdose-crisis"
  },
  {
    title: "Teens.DrugAbuse.gov",
    subtitle: "Opiods: Guide for Teens",
    href:
      "https://teens.drugabuse.gov/drug-facts/prescription-pain-medications-opioids"
  },
  {
    title: "Opioids.gov",
    subtitle: "Confronting the Opioid Crisis in the U.S.",
    href: "https://www.opioids.gov/"
  }
];

export const Field = ({ title, subtitle, href }) => (
  <div
    className={styles.Field}
    onClick={() => {
      window.open(href, "_blank");
    }}
  >
    <div>
      <strong>{title}</strong>
    </div>
    <div>{subtitle}</div>
  </div>
);

export default class Dropdown extends PureComponent {
  state = {
    showDropdown: false
  };
  toggleDropdown = () => {
    this.setState({ showDropdown: !this.state.showDropdown });
  };
  render() {
    const { showDropdown } = this.state;
    return (
      <Aux>
        <div className={styles.Dropdown} onClick={this.toggleDropdown}>
          <div>
            <div>
              <div
                className={styles.DropdownTitle}
                children="Help Your Community"
              />
              <div
                className={styles.DropdownSubtitle}
                children="Resources & Outreach Material"
              />
            </div>
            <div className={styles.DropdownChevron}>
              {showDropdown ? (
                <i className="fas fa-chevron-up" />
              ) : (
                <i className="fas fa-chevron-down" />
              )}
            </div>
          </div>
        </div>
        {showDropdown && (
          <div className={styles.DropdownMenu}>
            {DROPDOWN_OPTIONS.map((option, i) => <Field key={i} {...option} />)}
          </div>
        )}
      </Aux>
    );
  }
}
