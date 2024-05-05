import React from "react";
import Field from "../../shared/components/Field";

function RangeField({
  id,
  name,
  label,
  disabled,
  onChange,
  value,
  min = 0,
  max = 100,
  step = 0.3,
  onKeyDown,
  onKeyUp,
  onMouseDown,
  onMouseUp
}) {
  return (
    <Field
      className="range-field"
      htmlFor={name}
      label={label}
      disabled={disabled}
    >
      <input
        type="range"
        id={id}
        name={name}
        aria-label={label}
        min={min}
        max={max}
        step={step}
        value={value}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onChange={onChange}
        disabled={disabled}
      />
    </Field>
  );
}

export default RangeField;
