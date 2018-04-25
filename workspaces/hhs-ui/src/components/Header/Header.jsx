import React, { PureComponent } from "react";
import Title from "../Title";
import Brand from "../Brand";
import Input from "../Input";
import Dropdown from "./Dropdown";
import styles from "./Header.scss";

export default class Header extends PureComponent {
  state = {
    showDropdown: false
  };
  toggleDropdown = () => {
    this.setState({ showDropdown: !this.state.showDropdown });
  };
  render() {
    const { showDropdown } = this.state;

    return (
      <div className={styles.Container}>
        <div className={styles.Left}>
          <Brand />
        </div>

        <div className={styles.Middle}>
          <Title />
          <Input style={{ alignItems: "baseline" }} />
        </div>

        <div className={styles.Right}>
          <Dropdown />
        </div>

        {showDropdown && <div className={styles.DropdownMenu} />}
      </div>
    );
  }
}
