import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import AlignmentChooser from "../AlignmentChooser";
import Field from "../../../shared/components/Field";
import FontChooser from "../FontChooser";
import TextField from "../TextField";
import Fieldset from "../Fieldset";

function getProps({ metadataStore }) {
  return {
    setHeadingStyle: metadataStore.setHeadingStyle,
    headingFont: metadataStore.headingFont,
    headingColor: metadataStore.headingColor,
    headingAlignment: metadataStore.headingAlignment
  };
}

@inject(getProps)
@observer
class HeadingSettings extends Component {
  handleAlignmentChange = val => {
    this.props.setHeadingStyle("alignment", val);
  };

  handleColorChange = e => {
    this.props.setHeadingStyle("color", e.target.value);
  };

  handleFontChange = e => {
    this.props.setHeadingStyle("font", e.target.value);
  };

  render() {
    const { headingFont, headingColor, headingAlignment } = this.props;

    return (
      <Fieldset legend="Headings" className="heading-settings">
        <Field name="heading-font" label="Font">
          <FontChooser
            name="heading-font"
            onChange={this.handleFontChange}
            selected={headingFont}
          />
        </Field>

        <Field name="heading-font" label="Alignment">
          <AlignmentChooser
            id="heading-align"
            value={headingAlignment}
            onChange={this.handleAlignmentChange}
          />
        </Field>

        <TextField
          name="heading-color"
          label="Color"
          value={headingColor}
          onChange={this.handleColorChange}
        />
      </Fieldset>
    );
  }
}

export default HeadingSettings;
