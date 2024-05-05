import React, { Component } from "react";

class TextSizeRange extends Component {
  render() {
    const { id, name, mid, value, onChange, disabled } = this.props;
    const max = -(mid - 5);
    const min = -(mid + 5);
    return (
      <input
        id={id}
        name={name}
        type="range"
        min={min}
        max={max}
        step={0.3}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    );
  }
}

export default TextSizeRange;
