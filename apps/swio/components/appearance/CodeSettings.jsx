import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import Field from "../../../shared/components/Field";
import AlignmentChooser from "../AlignmentChooser";
import RangeField from "../RangeField.jsx";
import CodeThemeMenu from "../CodeThemeMenu";
import Fieldset from "../Fieldset";

function getProps({ metadataStore }) {
  const settings = metadataStore.codeSettings;
  return {
    ...settings,
    setCodeStyle: metadataStore.setCodeStyle,
    toggleSettingCodeWidth: metadataStore.toggleSettingCodeWidth
  };
}

@inject(getProps)
@observer
class CodeSettings extends Component {
  handleThemeChange = val => {
    this.props.setCodeStyle("theme", val);
  };

  handleWidthChange = e => {
    this.props.setCodeStyle("width", e.target.value);
  };

  handleWidthRangeMouseDown = () => {
    this.props.toggleSettingCodeWidth(true);
  };

  handleWidthRangeMouseUp = () => {
    this.props.toggleSettingCodeWidth();
  };

  handleBlockAlignmentChange = val => {
    this.props.setCodeStyle("blockAlignment", val);
  };

  render() {
    const { width, blockAlignment, theme } = this.props;
    return (
      <Fieldset legend="Code blocks" className="code-settings">
        <CodeThemeMenu onChange={this.handleThemeChange} value={theme} />
        <Field label="Block Alignment" htmlFor="code-block-alignment">
          <AlignmentChooser
            id="code-block-alignment"
            value={blockAlignment}
            onChange={this.handleBlockAlignmentChange}
          />
        </Field>
        <RangeField
          id="code-block-width"
          name="code-block-width"
          label="Width"
          step={0.25}
          value={width}
          onChange={this.handleWidthChange}
          onKeyDown={this.handleWidthRangeMouseDown}
          onKeyUp={this.handleWidthRangeMouseUp}
          onMouseDown={this.handleWidthRangeMouseDown}
          onMouseUp={this.handleWidthRangeMouseUp}
        />
      </Fieldset>
    );
  }
}

export default CodeSettings;
