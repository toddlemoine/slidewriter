import React, { Component, Fragment } from "react";
import dattr from "../helpers/dattr";
import "./DurationField.css";

class DurationField extends Component {
  setInputRef = node => {
    if (node) {
      this.inputNode = node;
    }
  };
  componentDidMount = () => {
    this.checkValidity();
  };
  componentDidUpdate = () => {
    this.checkValidity();
  };
  checkValidity = () => {
    if (this.props.disabled) return;
    const duration = this.inputNode.value;
    const validationMsg =
      duration === ""
        ? "Please enter a value to enable full-screen playback."
        : "";
    this.inputNode.setCustomValidity(validationMsg);
    this.inputNode.reportValidity();
  };
  handleDurationChange = e => {
    return this.props.onChange({
      duration: e.target.value,
      unit: this.props.unit
    });
  };

  handleUnitChange = e => {
    this.props.onChange({
      unit: e.target.value,
      duration: this.props.duration
    });
  };

  render() {
    const { disabled, duration, hours = true, name, text, unit } = this.props;
    const inputName = `${name}-duration`;
    const selectName = `${inputName}-unit`;
    const units = {
      s: "seconds",
      m: "minutes"
    };
    if (hours) {
      units.h = "hours";
    }
    return (
      <div className="duration-field">
        <span className="duration-text">{text}</span>
        <input
          {...dattr(inputName)}
          disabled={disabled}
          type="number"
          name={inputName}
          min="1"
          required={true}
          ref={this.setInputRef}
          onInput={this.handleDurationChange}
          value={duration}
          className="duration-input"
        />
        <select
          {...dattr(selectName)}
          className="duration-unit"
          disabled={disabled}
          name={selectName}
          onChange={this.handleUnitChange}
        >
          {Object.entries(units).map(([key, label]) => (
            <option key={key} value={key} selected={key === unit}>
              {label}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default DurationField;
