import ColorPicker from "rc-color-picker";
import React, { Component } from "react";
import "./ColorField.css";

class ColorField extends Component {
  handleColorPickerChange = ({ color }) => {
    this.props.onChange(color);
  };
  handleColorInputChange = e => {
    this.props.onChange(e.target.value);
  };
  render() {
    const { id, label, disabled, value, enableAlpha } = this.props;
    const colorPickerWrapperStyles = disabled
      ? {
          opacity: 0.5,
          pointerEvents: "none"
        }
      : {};
    return (
      <div className="color-field">
        <input
          id={id}
          aria-label={label}
          type="text"
          disabled={disabled}
          value={value}
          onChange={this.handleColorInputChange}
        />
        <div style={colorPickerWrapperStyles}>
          <ColorPicker
            defaultColor={value}
            enableAlpha={enableAlpha}
            onChange={this.handleColorPickerChange}
          />
        </div>
      </div>
    );
  }
}

export default ColorField;
