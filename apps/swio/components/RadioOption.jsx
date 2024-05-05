import classnames from "classnames";
import React from "react";
import InputGroupItem from "./InputGroupItem.jsx";
import "./RadioOption.css";

function RadioOption({
  id,
  name,
  className,
  checked,
  disabled,
  label,
  parentLabel,
  value,
  onChange
}) {
  const classes = classnames("radio-option", className);
  return (
    <InputGroupItem className={classes}>
      <input
        id={id}
        name={name}
        type="radio"
        disabled={disabled}
        checked={checked}
        value={value}
        onChange={onChange}
      />
      <label htmlFor={id} aria-label={`${parentLabel} ${label}`}>
        {label}
      </label>
    </InputGroupItem>
  );
}

export default RadioOption;
