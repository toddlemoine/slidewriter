import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import dattr from "../helpers/dattr.js";
import Field from "../../shared/components/Field";
import codeThemes from "../codeThemes";

class CodeThemeMenu extends Component {
  handleMenuChange = e => {
    this.props.onChange(e.target.value);
  };

  render() {
    const { value, onChange } = this.props;
    return (
      <Field name="code-theme-menu" label="Theme" className="code-theme-menu">
        <select
          {...dattr("code-theme-menu")}
          name="code-theme-menu"
          className="code-theme-menu"
          value={value}
          onChange={this.handleMenuChange}
        >
          <optgroup label="Light">
            {codeThemes.light.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </optgroup>
          <optgroup label="Dark">
            {codeThemes.dark.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </optgroup>
        </select>
      </Field>
    );
  }
}

export default CodeThemeMenu;
