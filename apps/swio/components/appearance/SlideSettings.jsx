import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import CheckboxField from "../CheckboxField";
import TextField from "../TextField";
import TextSizeRange from "../TextSizeRange";
import Field from "../../../shared/components/Field";
import Fieldset from "../Fieldset";

function getProps({ metadataStore }) {
  return {
    textSize: metadataStore.fontScaleFactorForRangeSlider,
    defaultTextSize: metadataStore.defaultFontScaleFactor,
    setFontScaleFactor: metadataStore.setFontScaleFactor,
    backgroundColor: metadataStore.backgroundColor,
    backgroundImage: metadataStore.backgroundImage,
    contentIsTopAligned: metadataStore.contentIsTopAligned,
    setBackgroundColor: metadataStore.setBackgroundColor,
    setBackgroundImage: metadataStore.setBackgroundImage,
    setContentPosition: metadataStore.setContentPosition
  };
}

@inject(getProps)
@observer
class SlideSettings extends Component {
  handleTextSizeRangeChange = e => {
    this.props.setFontScaleFactor(e.target.value);
  };
  handleBackgroundColorChange = e => {
    this.props.setBackgroundColor(e.target.value);
  };

  handleBackgroundImageChange = e => {
    this.props.setBackgroundImage(e.target.value);
  };

  handleContentPositionChange = e => {
    this.props.setContentPosition(e.target.checked);
  };

  render() {
    const {
      textSize,
      defaultTextSize,
      backgroundColor,
      backgroundImage,
      contentIsTopAligned
    } = this.props;

    return (
      <Fieldset legend="Slides" className="slide-settings">
        <Field htmlFor="text-size-range" label="Text size">
          <TextSizeRange
            id="text-size-range"
            name="text-size-range"
            mid={defaultTextSize}
            value={textSize}
            onChange={this.handleTextSizeRangeChange}
          />
        </Field>
        <TextField
          name="background-color"
          label="Background color"
          value={backgroundColor}
          onChange={this.handleBackgroundColorChange}
        />

        <TextField
          name="background-image"
          label="Background image"
          value={backgroundImage}
          onChange={this.handleBackgroundImageChange}
        />

        <CheckboxField
          fieldLabel="Pin slide content to top"
          name="content-position"
          checked={contentIsTopAligned}
          onChange={this.handleContentPositionChange}
        />
      </Fieldset>
    );
  }
}

export default SlideSettings;
