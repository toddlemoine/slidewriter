import React from "react";
import Field from "../../shared/components/Field";
import "./CheckboxField.css";

function CheckboxField({
  name,
  fieldLabel,
  label,
  disabled,
  onChange,
  checked
}) {
  const inputProps = {};
  if (disabled) {
    inputProps.disabled = disabled;
  }
  return (
    <Field className="checkbox-field" label={fieldLabel} disabled={disabled}>
      <label htmlFor={name}>{label}</label>
      <input
        {...inputProps}
        id={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
    </Field>
  );
}

export default CheckboxField;
