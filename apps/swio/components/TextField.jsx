import React from "react";
import dattr from "../helpers/dattr";
import Field from "../../shared/components/Field";
import "./TextField.css";

function TextField({ id, name, label, disabled, onChange, value }) {
  const inputProps = {};
  if (disabled) {
    inputProps.disabled = disabled;
  }
  return (
    <Field
      className="text-field"
      htmlFor={name}
      label={label}
      disabled={disabled}
    >
      <input
        {...dattr(name)}
        {...inputProps}
        name={name}
        id={id}
        type="text"
        value={value || ""}
        onChange={onChange}
      />
    </Field>
  );
}

export default TextField;
