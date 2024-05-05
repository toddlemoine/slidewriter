import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import "rc-color-picker/dist/rc-color-picker.css";
import EditorTabPanel from "./EditorTabPanel";
import HelpText from "../../shared/components/HelpText";
import AlignmentChooser from "./AlignmentChooser";
import ColorField from "./ColorField";
import Field from "../../shared/components/Field";
import InputGroup from "./InputGroup";
import RadioOption from "./RadioOption";
import RangeField from "./RangeField";
import SocialMediaMenu from "./SocialMediaMenu";
import TextField from "./TextField";
import "./FooterPanel.css";
import Fieldset from "./Fieldset";

function getProps(stores) {
  return {
    metadata: stores.metadataStore,
    setFooterProperty: stores.metadataStore.setFooterProperty
  };
}

@inject(getProps)
@observer
class FooterPanel extends Component {
  handleAlignmentChange = value => {
    this.props.setFooterProperty("alignment", value);
  };
  handleTextChange = e => {
    this.props.setFooterProperty("text", e.target.value);
  };
  handleOpacityChange = e => {
    this.props.setFooterProperty("opacity", e.target.value);
  };
  handleIconChange = e => {
    this.props.setFooterProperty("icon", e.target.value);
  };
  handleColorModeChange = e => {
    this.props.setFooterProperty("background", e.target.value);
  };
  handleColorFieldChange = color => {
    this.props.setFooterProperty("backgroundColor", color);
  };
  render() {
    const metadata = this.props.metadata;
    return (
      <EditorTabPanel id="footer" className="footer-panel">
        <HelpText>
          Add a username or other text that appears on every slide.
        </HelpText>
        <Fieldset>
          <TextField
            name="footer-text"
            label="Text"
            aria-label="Footer text"
            value={metadata.footerText}
            onChange={this.handleTextChange}
          />
          <Field
            name="footer-color-radio"
            label="Alignment"
            htmlFor="footer-alignment"
          >
            <AlignmentChooser
              id="footer-alignment"
              value={metadata.footerAlignment}
              onChange={this.handleAlignmentChange}
            />
          </Field>
          <Field name="footer-color-radio" label="Background color">
            <InputGroup>
              <RadioOption
                id="footer-background-color-mode-none"
                name="footer-background-color-mode"
                parentLabel="Background"
                label="None"
                value="none"
                checked={!metadata.hasFooterBackgroundColor}
                onChange={this.handleColorModeChange}
              />
              <RadioOption
                id="footer-background-color-mode-fill"
                name="footer-background-color-mode"
                parentLabel="Background color"
                label="Fill"
                value="fill"
                checked={metadata.hasFooterBackgroundColor}
                onChange={this.handleColorModeChange}
              />
              <ColorField
                id="footer-background-color-hex"
                label="background color hex value"
                disabled={!metadata.hasFooterBackgroundColor}
                value={metadata.footerBackgroundColor}
                onChange={this.handleColorFieldChange}
              />
            </InputGroup>
          </Field>

          <Field htmlFor="footer-socialmedia" label="Icon">
            <SocialMediaMenu
              id="footer-socialmedia"
              name="footer-socialmedia-menu"
              value={metadata.footerIcon}
              onChange={this.handleIconChange}
            />
          </Field>
          <RangeField
            id="footer-opacity"
            min=".1"
            max="1"
            label="Opacity"
            step=".1"
            value={metadata.footerOpacity}
            onChange={this.handleOpacityChange}
          />
        </Fieldset>
      </EditorTabPanel>
    );
  }
}

export default FooterPanel;
