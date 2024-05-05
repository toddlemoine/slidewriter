import React, { Component } from "react";
import dattr from "../helpers/dattr.js";
import Field from "../../shared/components/Field";
import themes from "../themes";
import "./ThemeMenu.css";

class ThemeMenu extends Component {
  render() {
    const {
      value,
      name = "theme-menu",
      label = "theme",
      onChange
    } = this.props;
    return (
      <Field htmlFor={name} label={label}>
        <select
          {...dattr(name)}
          id={name}
          name={name}
          className="theme-menu"
          value={value}
          onChange={onChange}
        >
          {themes.map(({ id, name }, index) => (
            <option key={index} value={id}>
              {name}
            </option>
          ))}
        </select>
      </Field>
    );
  }
}

export default ThemeMenu;
