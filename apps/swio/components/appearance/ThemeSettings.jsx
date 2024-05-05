import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Field from "../../../shared/components/Field";
import dattr from "../../helpers/dattr";
import Fieldset from "../Fieldset";
import capitalize from "../../helpers/capitalize";

function getProps({ metadataStore }) {
  return {
    setTheme: metadataStore.setTheme,
    theme: metadataStore.theme,
    themes: metadataStore.themes
  };
}

@inject(getProps)
@observer
class ThemeSettings extends Component {
  handleMenuChange = e => {
    this.props.setTheme(e.target.value);
  };

  render() {
    const { theme, themes } = this.props;
    return (
      <Fieldset legend="Theme" className="theme-settings">
        <Field
          name="theme-appearance-panel"
          label="Theme"
          className="theme-appearance-panel"
        >
          <select
            {...dattr("theme-appearance-panel")}
            name="theme-appearance-panel"
            className="theme-appearance-panel"
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
      </Fieldset>
    );
  }
}

export default ThemeSettings;
