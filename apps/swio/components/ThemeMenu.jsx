import { inject, observer } from "mobx-react";
import { sortBy } from "lodash.sortby";
import React, { Component } from "react";
import dattr from "../helpers/dattr";
import capitalize from "../helpers/capitalize";
import Field from "../../shared/components/Field";
import "./ThemeMenu.css";

function props({ metadataStore }) {
  return {
    theme: metadataStore.theme,
    themes: metadataStore.themes,
    setTheme: metadataStore.setTheme
  };
}

@inject(props)
@observer
class ThemeMenu extends Component {
  handleMenuChange = e => {
    this.props.setTheme(e.target.value);
  };

  render() {
    const { theme, themes } = this.props;
    return (
      <Field name="theme-menu" label="Theme" className="theme-menu">
        <select
          {...dattr("theme-menu")}
          name="theme-menu"
          ref={this.setRef}
          className="theme-menu"
          value={theme}
          onChange={this.handleMenuChange}
        >
          {Object.entries(themes).map(([themeStyle, groupedThemes]) => (
            <optgroup label={capitalize(themeStyle)}>
              {groupedThemes.map((t, index) => (
                <option key={index} value={t.id}>
                  {t.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </Field>
    );
  }
}

export default ThemeMenu;
