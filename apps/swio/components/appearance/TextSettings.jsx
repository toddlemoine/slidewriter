import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import AlignmentChooser from "../AlignmentChooser.jsx";
import Field from "../../../shared/components/Field";
import FontChooser from "../FontChooser.jsx";
import RangeField from "../RangeField.jsx";
import TextField from "../TextField.jsx";
import Fieldset from "../Fieldset";

function getProps({ metadataStore }) {
  return {
    setTextStyle: metadataStore.setTextStyle,
    toggleSettingTextWidth: metadataStore.toggleSettingTextWidth,
    textFont: metadataStore.textFont,
    textAlignment: metadataStore.textAlignment,
    textWidth: metadataStore.textWidth,
    textColor: metadataStore.textColor
  };
}

@inject(getProps)
@observer
class TextSettings extends Component {
  handleAlignmentChange = val => {
    this.props.setTextStyle("alignment", val);
  };

  handleColorChange = e => {
    this.props.setTextStyle("color", e.target.value);
  };

  handleFontChange = e => {
    this.props.setTextStyle("font", e.target.value);
  };

  handleWidthChange = e => {
    this.props.setTextStyle("width", e.target.value);
  };

  handleWidthRangeMouseDown = () => {
    this.props.toggleSettingTextWidth(true);
  };

  handleWidthRangeMouseUp = () => {
    this.props.toggleSettingTextWidth();
  };

  render() {
    const { textFont, textAlignment, textColor, textWidth } = this.props;
    return (
      <Fieldset legend="Paragraphs and lists" className="text-settings">
        <Field name="text-font" label="Font">
          <FontChooser
            name="text-font"
            onChange={this.handleFontChange}
            selected={textFont}
          />
        </Field>
        <Field name="text-alignment" label="Alignment">
          <AlignmentChooser
            id="text-align"
            value={textAlignment}
            onChange={this.handleAlignmentChange}
          />
        </Field>

        <RangeField
          name="text-width"
          label="Width"
          step={0.25}
          value={textWidth}
          onChange={this.handleWidthChange}
          onKeyDown={this.handleWidthRangeMouseDown}
          onKeyUp={this.handleWidthRangeMouseUp}
          onMouseDown={this.handleWidthRangeMouseDown}
          onMouseUp={this.handleWidthRangeMouseUp}
        />

        <TextField
          name="text-color"
          label="Color"
          value={textColor}
          onChange={this.handleColorChange}
        />
      </Fieldset>
    );
  }
}

export default TextSettings;
