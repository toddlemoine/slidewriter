import React, { Component } from "react";
import {
  SERIF,
  SANS_SERIF,
  MONOSPACE,
  HANDWRITING,
  default as fonts
} from "../fonts.js";

import "./FontChooser.css";

class FontChooser extends Component {
  render() {
    const { name, onChange, selected, disabled } = this.props;
    return (
      <select
        disabled={disabled}
        className="font-chooser"
        name={name}
        value={selected}
        onChange={onChange}
      >
        {[SERIF, SANS_SERIF, HANDWRITING, MONOSPACE].map((fontStyle, key) => (
          <optgroup key={key} label={fontStyle}>
            {fonts[fontStyle].map(([font], key) => (
              <option key={key} value={font}>
                {font}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    );
  }
}

export default FontChooser;
